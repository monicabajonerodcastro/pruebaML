export default function CategoryPathRender({categoryPath}){
    var breadcrumb = [];
    categoryPath.map((category, _index) => {
        breadcrumb.push(category.name);
        breadcrumb.push(">");
    });
    breadcrumb.splice(-1,1);
    return <span>{breadcrumb.join(" ")}</span>;
}