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
        var cell_number = (Math.random()*100000).toFixed(0);
        matrix_with_numbers[i][j] = cell_number;
    }
}


var Table = React.createClass({
    getInitialState: function() {
        return {data: this.props.data};
    },
    //componentDidMount: function() {
    //    console.log('component was mounted');
    //},
    //componentWillMount: function() {
    //  console.log('component will mount');
    //},
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
                {this.state.data.map(function(row) {
                    //console.log(row);
                    return (
                        <tr>
                            {row.map(function(cell, i) {
                                var color = colorizeMe(cell);
                                return <td><span style={color}>{cell}</span></td>;
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
    //console.log('background-color':'rgb('+red.toFixed(0)+','+green.toFixed(0)+',0)');
    return {'backgroundColor':'rgba('+red.toFixed(0)+','+green.toFixed(0)+',0,0.5)'};
    //return 'rgba('+red.toFixed(0)+','+green.toFixed(0)+',0,0.5)';
};

//var data = [[1,2,3],[4,5,6],[7,8,9]];
var data = matrix_with_numbers;
//
// Render the component in the "app" DOM node
// giving it the initial data
//
var table = React.render(
    React.createElement(Table, {data: data}),
    document.getElementById('content'));


var LikeButton = React.createClass({

    handleClick: function(event) {
        //this.setState({liked: !this.state.liked});

        //var new_data = [];
        //for(var i = 0; i<NUMBER_OF_PRODUCTS; i++) {
        //    new_data[i] = [];
        //    for (var j = 0; j<NUMBER_OF_ZIP_CODES; j++) {
        //        var cell_number = (Math.random()*100000).toFixed(0);
        //        new_data[i][j] = cell_number;
        //    }
        //}

        data[0][0] = (Math.random()*100000).toFixed(0);

        console.time("setstate");
        //table.setState({data: [[]] })
        //table.setState({data: new_data });
        table.setState({data: data });
        console.timeEnd("setstate");
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
    <LikeButton />,
    document.getElementById('button_holder')
);