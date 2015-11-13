/**
 * Created by czarifis on 11/11/15.
 */


var NUMBER_OF_PRODUCTS = 100;
var NUMBER_OF_ZIP_CODES = 1000;
var NUMBER_OF_DIFFS = 1;

var matrix_with_numbers = [];
for(var i = 0; i<NUMBER_OF_PRODUCTS; i++) {
    matrix_with_numbers[i] = [];
    for (var j = 0; j<NUMBER_OF_ZIP_CODES; j++) {
        matrix_with_numbers[i][j] = (Math.random()*100000).toFixed(0);
    }
}


var Table = React.createClass({
    getInitialState: function() {
        return {data: this.props.data};
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
                {this.state.data.map(function(row, i) {
                    //console.log(row);
                    return (
                        <tr key={i}>
                            {row.map(function(cell, j) {
                                var color = colorizeMe(cell);
                                return <td key={j} ><span style={color}>{cell}</span></td>;
                            })}
                        </tr>);
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

var data = matrix_with_numbers;

var table = ReactDOM.render(
    React.createElement(Table, {data: data}),
    document.getElementById('content'));


var DiffButton = React.createClass({

    handleClick: function(event) {
        //this.setState({liked: !this.state.liked});

        for (j = 0 ; j<NUMBER_OF_DIFFS; j++) {
            if (data[0][j] < 50000) {
                data[0][j] = Number(data[0][j]) + 50000;
            }
            else {
                data[0][j] = Number(data[0][j]) - 50000;
            }
        }

        //console.log(NUMBER_OF_DIFFS);
        //console.time("setstate");
        table.setState({data: data });
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