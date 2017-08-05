module.exports = class extends think.Controller {
  __before() {
      //url中的参数
	  this.urlParams = this.ctx.request.query;

      //post参数
	  this.postParams = {};

	  //file参数
	  this.fileParams = {};

      if(this.ctx.isPost){
		  this.postParams = this.ctx.request.body.post;
		  this.fileParams = this.ctx.request.body.file;
      }
  }


  __after(){
      this.urlParams = undefined;
      this.postParams = undefined;
      this.fileParams = undefined;
  }

};
