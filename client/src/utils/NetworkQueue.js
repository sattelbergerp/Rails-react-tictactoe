function NetworkQueue(){
  this.queue = [];

  let download = () => {
    let cb = this.queue[0];
    if(cb!=null){
      cb(() => {
        this.queue.splice(0, 1)
        download();
      });
    }
  }

  this.isBusy = () => {
    return this.queue.length > 0;
  }

  this.add = (cb) => {
    let isBusy = this.isBusy();
    this.queue.push(cb);
    if(!isBusy) download();
  }
}

export {NetworkQueue}
