const handlebars = require('handlebars');
module.exports =  {
    sum: (a,b) => a + b,
    sortable : (field, sort) => {         

         const sortType = field === sort.name ? sort.type : 'default';

         const icons = {
             default : "bi bi-chevron-expand",
             asc : "bi bi-sort-down-alt",
             desc : "bi bi-sort-down"
         } ;

         const types = {
             default : "desc",
             asc : "desc",
             desc : "asc"
         };

         const icon = icons[sortType];
         const type = types[sortType];

         const href = handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

         const output = `<a href="${href}">
                            <span class="${icon}"></span>
                                </a>`;

        return new handlebars.SafeString(output);
     }
 };