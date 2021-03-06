var superagent = require('superagent')
var expect = require('expect.js')

describe('express rest api server', function(){
  var id;

  it('post object', function(done){
    superagent.post('http://localhost:3000/event')
      .send({ name: 'm'
        , email: 'nnnnnnnnnn@mmmmmmmm'
      })
  .end(function(e,res){
        console.log(res.body)
        console.log(res.body[0])
        console.log(res.body[0].msg)
        console.log(res.body.length)
        console.log(e)
        console.log(res.body[0]._id.length)
        
        id = res.body[0]._id
        console.log(id)
        expect(e).to.eql(null)
        expect(res.body.length).to.eql(1)
        expect(res.body[0]._id.length).to.eql(24)
        
        done()
      })    
  })

  it('retrieves an object', function(done){
    superagent.get('http://localhost:3000/event/'+id)
      .end(function(e, res){
        console.log(res.body)
        console.log(id)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)        
        expect(res.body._id).to.eql(id)        
        done()
      })
  })

  it('retrieves a collection', function(done){
    superagent.get('http://localhost:3000/events')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)        
        done()
      })
  })

  it('updates an object', function(done){
    superagent.put('http://localhost:3000/event/'+id)
      .send({name: 'updaaaaaaaaate'
        , email: 'update@'})
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body[0].msg).to.eql('success')        
        done()
      })
  })

  it('checks an updated object', function(done){
    superagent.get('http://localhost:3000/event/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)        
        expect(res.body._id).to.eql(id)        
        expect(res.body[0].name).to.eql('updaaaaaaaaate')        
        done()
      })
  })    
  it('removes an object', function(done){
    superagent.del('http://localhost:3000/event/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body[0].msg).to.eql('success')    
        done()
      })
  })      
})
