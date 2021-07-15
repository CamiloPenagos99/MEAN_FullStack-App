export class Project{
//Propiedades el modelo
    public _id:string;
    public name:string;
    public desc:string;
    public category:string;
    public year:number;
    public langs:string;
    public image:string;
//Constructor de la clase
    constructor(id:string,name:string,description:string,category:string,
        year:number,langs:string,image:string){
        this._id=id;
        this.name=name;
        this.desc=description;
        this.category=category;
        this.year=year;
        this.langs=langs;
        this.image=image;    
    }


}