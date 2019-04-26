<template>
  <div class="CrudIndex">
    
    <form class = "formAdd">
      <div class = "errors">
        <div v-if="errors.length" class = "errors__content">
            <p>
            Please fill up the required fields.
            </p>
        </div>
      </div>  

      <div class="form-group">
        <input v-model="title" placeholder="Title">
      </div>
       <div class="form-group">
        <input v-model="isbn" placeholder="ISBN">
      </div>
      <div class="form-group">
        <input v-model="author" placeholder="Author">
      </div>
      <div class="form-group">
        <input type="number" v-model="year" placeholder="Year">
      </div>  
      <div class="form-group">
        <input v-model="publisher" placeholder="Publisher">
      </div> 
      <button @click="addBook" class="book__add">ADD</button>
    </form>
   
    <br>
    <button @click="deleteAll">Clear List</button>
    <div>
      <h3>LIST OF BOOKS</h3>
      <table class="book" v-if="!!books.length">
        <tr class="book__header">
          <th>TITLE</th>
          <th>ISBN</th>
          <th>AUTHOR</th>
          <th>YEAR</th>
          <th>PUBLISHER</th>
          <th>ACTION</th>
        </tr>
        <tr v-for="(books, index) in books" :key="index">
          <td class="book__title">{{ books.title }}</td>
          <td class="book__isbn">{{ books.isbn }}</td>
          <td class="book__author">{{ books.author }}</td>
          <td class="book__year">{{ books.year }}</td>
          <td class="book__publisher">{{ books.publisher }}</td>
          <td class="book__action">
            <button class="book__action_edit">EDIT</button>
            <button @click="deleteAll" class="book__action_delete">DELETE</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import * as book from "../utils/books";
export default {
  name: "CrudIndex",
  props: {
    msg: String
  },
  data() {
    return {
      title: "",
      isbn: "",
      author: "",
      year: "",
      publisher: "",
      errors:"",
      books: this.getAll()
    };
  },
  mounted() { },
  methods: { 

  

    addBook(e) { 
      if (this.title && this.author && this.year && this.publisher && this.isbn ) {
        book.add({  
          title: this.title,
          isbn: this.isbn,
          author: this.author,
          year: this.year,
          publisher: this.publisher
        });
        this.books = this.getAll();
        this.title = this.author = this.year = this.publisher = ""
      }
      else{
        this.errors = [];

        if (!this.title) {
          this.errors.push('Title')
        }
        if(!this.isbn){
          this.errors.push('ISBN')
        }
        if (!this.author) {
          this.errors.push('Author required.')
        }
        if (!this.year) {
          this.errors.push('Year required.')
        }
        if (!this.publisher) {
          this.errors.push('Publisher required.')
        }

        e.preventDefault();
        
        
      }
      
    },
    getAll() {
      return book.getAll();
    },
    deleteAll(){
      localStorage.removeItem('books')
      this.books=[]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "scss" scoped>
.book {
  margin: 0 auto;
  width: 90%;
  
  &__header {
    font-size: 16px;
    background-color: #228B22;
    border-color: 5px sold #228B22;
    color: white;
    height: 30px;
    width: 50px;
  }

  &__title {
  width: 20%;
  }

   &__isbn {
    width: 15%;
  }

  &__author {
  width: 15%;
  }

  &__year {
    width: 10%;
  }

  &__publisher {
    width: 20%;
  }

  &__action {
    width: 25%;
  }

}


.formAdd{
  input {
  width: 50%;
  text-align:left;
  padding: 12px 20px;
  margin: 8px 0px;
  box-sizing: border-box;
  } 
}

.book__action_edit,
.book__action_delete,
.book__add {
  border: 2px solid #228B22;
  border-radius: 5px;
  background-color: white;
  padding: 10px 30px;
}
.book__action_edit:hover,
.book__action_delete:hover,
.book__add:hover {
  background-color: #228B22;
  color: white;
}
.book__add {
  padding: 10px 70px;
}
 
/* SCSS */
.errors{
  
  margin: 0 auto;
  width: 50%;

  &__content{
    width: 50%;
    float:right;
    line-height: 80%;
    text-align: right;
    background-color: #CD4343;
    padding: 10px;
    height: auto;
    font-size: 15px;
    color: white;
  }
}
</style>