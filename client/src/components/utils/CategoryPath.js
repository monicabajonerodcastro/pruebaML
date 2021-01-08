/**
 * 
 * CategoryPathRender function
 * 
 * This function returns an element with the path to be displayed at the top of the list of items.
 * The path is built dynamically through of the array of categories.
 * 
 * @param {array} categoryPath  
 */

export default function CategoryPathRender({categoryPath}){
    var breadcrumb = [];
    if(categoryPath){
        categoryPath.map((category, _index) => {
            breadcrumb.push(category.name);
            breadcrumb.push(">");
        });
        breadcrumb.splice(-1,1);
    }
    return <span>{breadcrumb.join(" ")}</span>;
}