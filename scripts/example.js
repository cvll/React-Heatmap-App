/**
 * Created by czarifis on 11/11/15.
 * Modified by chris lopez on 11/17/15
 */


var NUMBER_OF_PRODUCTS = 100;
var NUMBER_OF_ZIP_CODES = 1000;
// var NUMBER_OF_PRODUCTS = 10;
// var NUMBER_OF_ZIP_CODES = 100;
var NUMBER_OF_DIFFS = 1;

var matrix_with_numbers = []
for(var i = 0; i<NUMBER_OF_PRODUCTS; i++) {
    matrix_with_numbers[i] = [];
    for (var j = 0; j<NUMBER_OF_ZIP_CODES; j++) {
        matrix_with_numbers[i][j] = (Math.random()*100000).toFixed(0);
    }
}

var Cell = React.createClass({

    getInitialState: function() {
        return {previousData: this.props.data};
    },
    /* THE BAD: I should not be manipulating the state of the component directly.
       Nor should I be updating the state at this point in the lifecycle.
       Using setState() here causes an infinite loop of updates.
       But unfortunately, though documentation states you should be comparing
       this.props(previous, theoretically) against the nextprops(current, theoretically),
       this.props == nextprops !!! This forced me to update our state to 'previousData' as
       opposed to data. This way I can properly compare the data to determine if I should
       update.  
    */
     
    shouldComponentUpdate: function(nextprops,nextState) {
      var result = nextprops.data !== this.state.previousData;
      this.state.previousData = nextprops.data;
      return result;
    },
    render: function() {
        var color = colorizeMe(this.props.data);
        return (
            <td key={this.props.key}>
                <span style={color}>{this.props.data}</span>
            </td>
        )
    }
})


var Row = React.createClass({
    getInitialState: function() {
        return {previousData : Immutable.List(this.props.data)};
    },
    /* THE BAD: Full disclosure, this ALWAYS returns true.
                When passing immutables through props, React does
                something with the prop object such that when it goes
                from the parent(table) -> child(row) the data object
                goes from an Immutable object to a regular array.
                Thus the comparison always returns true.
     */
    shouldComponentUpdate: function(nextprops,nextState) {
      var result = nextprops.data !== this.state.previousData;
      this.state.previousData = Immutable.List(nextprops.data);
      return result;
    },
    render: function() {
        return (
            <tr>
             {this.props.data.map(function(cell, j) {
                                return (<Cell key={j} data={cell}/>);
                            })}
            </tr>
        )
    }
})

var Table = React.createClass({
    getInitialState: function() {
        return {};
    },
    shouldComponentUpdate: function(nextprops,nextState) {
      return true;  
    },
    componentWillUpdate: function(){
        //console.log('component will update');
        console.time('update');
    },
    componentDidUpdate: function(){
        console.timeEnd('update');
        //console.log('component did update');
    },
    render: function () {
        return (
            <table><tbody>
                {this.props.data.map(function(row, i) {
                    //console.log(row);
                    return ( <Row key={i} data={row}/> );
                })}
            </tbody></table>
        );
    }
});

function colorizeMe(value) {

    var red = 0;
    var green = 0;
    if (value < (50000)) {
        red = value/255;
    }
    else {
        green = value/255;
    }
    return {'backgroundColor':'rgba('+red.toFixed(0)+','+green.toFixed(0)+',0,0.5)'};
}

//var data = matrix_with_numbers;
var data = Immutable.List(matrix_with_numbers);

var table = ReactDOM.render(
    React.createElement(Table, {data: data}),
    document.getElementById('content'));


var DiffButton = React.createClass({

    handleClick: function(event) {
        //this.setState({liked: !this.state.liked});

        // for (j = 0 ; j<NUMBER_OF_DIFFS; j++) {
        //     if (data[0][j] < 50000) {
        //         data[0][j] = Number(data[0][j]) + 50000;
        //     }
        //     else {
        //         data[0][j] = Number(data[0][j]) - 50000;
        //     }
        // }

        for (j = 0 ; j<NUMBER_OF_DIFFS; j++) {
            if (data.get(0)[j] < 50000) {
                var tmp = data.get(0);
                
                tmp[j] = Number(tmp[j]) + 50000;
                data = data.set(0,tmp)
            }
            else {
                var tmp = data.get(0);
                tmp[j] = Number(tmp[j]) - 50000;
                data = data.set(0,tmp)
            }
        }
        //console.log(NUMBER_OF_DIFFS);
        //console.time("setstate");
        table.setProps({data:Immutable.List(data)});
        //console.timeEnd("setstate");
    },
    render: function() {
        return (
            <button onClick={this.handleClick}>
            Apply Diff
            </button>
        );
    }
});

ReactDOM.render(
    <DiffButton />,
    document.getElementById('button_holder')
);