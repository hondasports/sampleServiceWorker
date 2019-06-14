<template>
  <div class="hello">
    <div>this is web worker sample.</div>
    <button @click="sendChar">send queue {{ number }}</button>
    <div>response number -> {{ sentNumber }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
    worker: null,
    number : 0,
    sentNumber: 0
  }),
  methods: {
    sendChar : function() {
      const postData = {};
      postData.type = 'send';
      postData.val = this.number;
      this.number += 1;
      this.worker.postMessage(postData);
    }
  },
  mounted() {
    if (this.worker === null) {
      this.worker = new Worker('/worker.js');
      this.worker.postMessage( {type:'start'} );
      this.worker.onmessage = (e) => {
        this.sentNumber = e.data;
      };
    }
  },
  beforeDestroy() {
    if (this.woker !== null) {
      this.worker.terminate();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
