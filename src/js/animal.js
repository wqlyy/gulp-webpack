export class animal{
  constructor(name){
    this.name = name;
  }
  sayHello(){
    alert(`hello ${this.name} !`);
    console.log(this.name);
  }
}
export default animal ;