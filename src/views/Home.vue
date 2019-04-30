<template>
  <div class="CrudIndex">
    
    <form class = "formAdd">
      <div class = "validation">
       <p v-if="errors.length" style = "background-color: #cd4343;" class = "validation__content">
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
            <button @click="() => closeMessage()" class="closeBtn">close</button>
          </p>
        <div v-if = "book_added === true" style = "background-color: green;" class = "validation__content">
          <p>
           <span>Book edited!</span>
          </p>
          <button @click="() => closeMessage()" class="closeBtn">close</button>
        </div> 
      </div>
      <div class="form-group">
        <input v-model="title" placeholder="Title">
      </div>
       <div class="form-group">
        <input type="number" v-model="isbn" placeholder="ISBN (Must contain 13 digits only)" minlength="13" maxlength="13">
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
        <tr v-for="(book, index) in books" :key="index">
          <td class="book__title">{{ book.title }}</td>
          <td class="book__isbn">{{ book.isbn }}</td>
          <td class="book__author">{{ book.author }}</td>
          <td class="book__year">{{ book.year }}</td>
          <td class="book__publisher">{{ book.publisher }}</td>
          <td class="book__action">
            <router-link :to="`/edit/${book.isbn}`" class="book__action_edit">EDIT</router-link>
            <button @click="() => deleteBook(book.isbn)" class="book__action_delete">DELETE</button>
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
  props: {},
  data() {
    return {
      title: "",
      isbn: "",
      author: "",
      year: "",
      publisher: "",
      errors: [],
      book_added: false,
      books: this.getAll()
    };
  },
  mounted() {},
  methods: {
    addBook(e) {
      this.errors = [];

      if (
        !this.title ||
        !this.isbn ||
        !this.author ||
        !this.author ||
        !this.year ||
        !this.publisher
      ) {
        this.errors.push("Fill up the required fields");
        e.preventDefault();
      } else if (this.isbn.length >= 14 || this.isbn.length <= 12) {
        this.errors.push("ISBN should be 13 digits only");
        e.preventDefault();
      } else if (this.year.length >= 5 || this.year.length <= 3) {
        this.errors.push("Invalid year");
        e.preventDefault();
      } else {
        book.add({
          title: this.title,
          isbn: this.isbn,
          author: this.author,
          year: this.year,
          publisher: this.publisher
        });
        e.preventDefault();
        this.books = this.getAll();
        this.title = this.isbn = this.author = this.year = this.publisher = "";
        this.book_added = true;
      }
    },
    closeMessage() {
      this.errors = [];
      this.book_added = false;
    },
    getAll() {
      return book.getAll();
    },
    deleteBook(isbn) {
      const list = this.books.filter((book) => {
        return book.isbn !== isbn;
      });
      this.books = list;
      localStorage.setItem("books", JSON.stringify(list));
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "scss" scoped>
.book {
  margin: 0 auto;
  width: 90%;

  &__header {
    font-size: 16px;
    background-color: #228b22;
    border-color: 5px sold #228b22;
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

  &__add {
    padding: 10px 70px;
  }
}
.formAdd {
  input {
    width: 50%;
    text-align: left;
    padding: 12px 20px;
    margin: 8px 0px;
    box-sizing: border-box;
  }
}
ul {
  list-style: none;
}
.book__action_edit,
.book__action_delete,
.book__add {
  border: 2px solid #228b22;
  border-radius: 5px;
  background-color: white;
  padding: 10px 30px;
  text-decoration: none;
}
.book__action_edit:visited {
  color: black;
}
.book__action_edit:hover,
.book__action_delete:hover,
.book__add:hover {
  background-color: #228b22;
  color: white;
}
.validation {
  margin: 0 auto;
  width: 50%;

  .validation__content {
    width: 50%;
    float: right;
    line-height: 80%;
    text-align: right;
    padding: 10px;
    height: auto;
    font-size: 15px;
    color: white;
  }
}
.closeBtn{
  background-color: white;
  border: 2px solid white;
  border-radius: 2px;
}
</style>