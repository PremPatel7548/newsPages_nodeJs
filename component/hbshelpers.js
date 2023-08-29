const { options } = require("just-handlebars-helpers/lib/helpers/html");

var helper = {
    if: (v1, op, v2, options)=>{
        switch(op)
        {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    }
}

module.exports = helper;

// const hbs = require('hbs');

// // Custom helper function to check if a value is greater than a threshold
// handlebars.registerHelper('gt', function (value, threshold, options) {
//     if (value > threshold) {
//       return options.fn(this);
//     } else {
//       return options.inverse(this);
//     }
//   });