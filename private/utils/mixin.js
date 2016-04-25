export const mixin = (...mixins) => {
  /**
   *
   */
  class Mixin{
    /**
     * [constructor description]
     * @method constructor
     * @return {[type]}    [description]
     */
    constructor(...args){
      this.constructors = mixins;
      this.supers = mixins.map((mixin) => {
        if(mixin.name){
          return new (mixin.bind(...[null, ...args, this]))();
        }
        return mixin.apply(this, args);
      });
      return this;
    }
  }

  const copyProperties = (target, source) => {
    const symbols = Object.getOwnPropertySymbols(source);
    const properties = Object.getOwnPropertyNames(source);
    for(const key of [...properties, ...symbols]){
      if(key !== 'constructor' && key !== 'prototype' && key !== 'name'){
        const desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }

  mixins.reverse();
  for(const mixin of mixins){
    copyProperties(Mixin, mixin);
    copyProperties(Mixin.prototype, mixin.prototype);
  }

  return Mixin;
}
