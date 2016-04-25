/**
 * Default class for create Classes
 */
export default class Class{
  /**
   * constructor of the class
   * @method constructor
   * @param  {[type]}    options [description]
   * @param  {[type]}    Base    [description]
   * @return {[type]}            [description]
   */
  constructor(options, Base){
    const isObject = typeof options === 'object';
    const isArray = options instanceof Array;
    const self = Base || this;

    if(!isObject || isArray){
      return false;
    }

    Object.keys(options).map((property) => {
      const symbol = Symbol.for(`${self.constructor.name}.${property}`);
      self[symbol] = options[property];
    });

    return self;
  }

  /**
   * Get the value of a specific property
   * @method get
   * @param  {[type]} property [description]
   * @return {[type]}          [description]
   */
  get(property){
    return this[Symbol.for(`${this.constructor.name}.${property}`)];
  }
  /**
   * Set the value to a specific property
   * @method set
   * @param  {[type]} property [description]
   * @param  {[type]} val      [description]
   * @return {[type]}          [description]
   */
  set(property, val){
    return this[Symbol.for(`${this.constructor.name}.${property}`)] = val;
  }
}
