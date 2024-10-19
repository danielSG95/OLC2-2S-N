class Generator {
  constructor() {
    this.Temporal = 0;
    this.Code = []; // STRING raw code
    this.TempList = []; // lista de temporales
    this.Label = 0;
    this.FinalCode = []; // encabezado y el footer
    this.Data = []; // array de .data
    //this.Stack = []; // stack
    this.spCounter = 1;
  }

  getCode() {
    return this.Code;
  }

  newTemp() {
    this.Temporal += 4;
    return this.Temporal;
  }

  getFinalCode() {
    // add headers
    // add footer
    this.addHeaders();
    this.addFooters();
    return this.Code.join("");
  }

  newLabel() {
    let temp = this.Label;
    this.Label++;
    return `L${temp}`; // L1, L2, L3, L4
  }

  newBodyLabel(label) {
    this.Code.push(`\t${label}:\n`);
  }

  newTemp() {
    this.Temporal += 4; // byte
    return this.Temporal;
  }

  addBreak() {}

  addBr() {
    this.Code.push("\n");
  }

  comment(text) {
    this.Code.push(`#### ${text} \n`);
  }

  // load inmediate
  addLi(left, right) {
    this.Code.push(`\tli ${left}, ${right}\n`);
  }

  addLa(left, right) {
    this.Code.push(`\tla ${left}, ${right}\n`);
  }

  // load word
  addLw(left, right) {
    this.Code.push(`\tlw ${left}, ${right}\n`);
  }

  // store word
  addSw(left, right) {
    this.Code.push(`\tsw ${left}, ${right}\n`);
  }

  addSlli(target, left, right) {
    this.Code.push(`\tslli ${target}, ${left}, ${right}\n`);
  }

  addBlt(left, right, target) {
    this.Code.push(`\tblt ${left}, ${right}, ${target}\n`);
  }

  addSlt(rd, left, rigth) {
    this.Code.push(`\tslt ${rd}, ${left}, ${rigth}\n`);
  }

  addBgt(left, right, target) {
    this.Code.push(`\tbgt ${left}, ${right}, ${target}\n`);
  }

  addBge(left, right, target) {
    this.Code.push(`\tbge ${left}, ${right}, ${target}\n`);
  }

  addBlez(left, right, target) {
    this.Code.push(`\tblez ${left}, ${right}, ${target}\n`);
  }

  addBeq(left, right, target) {
    this.Code.push(`\tbeq ${left}, ${right}, ${target}\n`);
  }

  addBne(left, right, target) {
    this.Code.push(`\tbne ${left}, ${right}, ${target}\n`);
  }

  addJump(lvl) {
    this.Code.push(`\tj ${lvl}\n`);
  }

  newBodyLabel(lvl) {
    this.Code.push(`\t${lvl}:\n`);
  }

  addMove(left, right) {
    this.Code.push(`\tmv ${left}, ${right}\n`);
  }

  // add, mult, etc.
  addOperation(operation, target, left, right) {
    this.Code.push(`\t${operation} ${target}, ${left}, ${right}\n`);
  }

  addSystemCall() {
    this.Code.push("\tecall\n");
  }

  addHeaders() {
    this.Code.unshift("\n.text\n.globl _start\n\n_start:\n");
    this.Data.unshift(".data\n");
    this.Code = [...this.Data, ...this.Code];
  }

  addFooters() {
    this.Code.push("\n\tli a0, 0\n");
    this.Code.push("\tli a7, 93\n");
    this.Code.push("\tecall\n");
  }

  addData(code) {
    this.Data.push(code);
  }
}

export default Generator;
