<template>
    <div>
      <button @click="$router.go(-1)" class = "backBtn">BACK</button> 
      <form class = "formEdit"> 
        <div class = "validation">
          <p v-if="errors.length" style = "background-color: #cd4343;" class = "validation__content">
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
            <button @click="() => closeMessage()" class="closeBtn">close</button>
          </p>
          <div v-if = "bookEdited === true" style = "background-color: green;" class = "validation__content">
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
          <input v-model="isbn" type="number" placeholder="ISBN (Must contain 13 digits only)">
        </div>
        <div class="form-group">
          <input v-model="author" placeholder="Author">  
        </div>
        <div class="form-group">
          <input v-model="year" type="number"  placeholder="Year">
        </div>  
        <div class="form-group">
          <input v-model="publisher" placeholder="Publisher">
        </div>
        <button @click="editBook" class="book__edit">EDIT</button>   
      </form>
      
    </div>
</template> 

<script>
import * as book from "../utils/books";

export default {
  data() {
    return {
      title: "",
      isbn: "",
      author: "",
      year: "",
      publisher: "",
      bookIndex: "",
      errors: [],
      bookEdited: false,
      books: this.getAll()
    };
  },
  beforeMount() {
    this.books.filter((book, index) => {
      if (this.$route.params.id == book.isbn) {
        this.bookIndex = index;
        this.title = book.title;
        this.isbn = book.isbn;
        this.author = book.author;
        this.year = book.year;
        this.publisher = book.publisher;
      }
    });
  },
  methods: {
    getAll() {
      return book.getAll();
    },
    editBook(e) {
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
        console.log("hehe");
        const list = this.books.filter((book) => {
          return book.isbn !== this.$route.params.id;
        });
        this.books = list;
        localStorage.setItem("books", JSON.stringify(list));
        book.add({
          title: this.title,
          isbn: this.isbn,
          author: this.author,
          year: this.year,
          publisher: this.publisher
        });
        this.bookEdited = true;
        e.preventDefault();
      }
    },
    closeMessage() {
      this.errors = [];
      this.book_added = false;
    }
  }
};
</script>

<style lang="scss" scoped>
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
.formEdit {
  input {
    width: 50%;
    text-align: left;
    padding: 12px 20px;
    margin: 8px 0px;
    box-sizing: border-box;
  }
}

.book__edit,
.backBtn {
  border: 2px solid #228b22;
  border-radius: 5px;
  background-color: white;
  padding: 10px 30px;
  text-decoration: none;
}

.book__edit:hover,
.backBtn:hover {
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
.closeBtn {
  background-color: white;
  border: 2px solid white;
  border-radius: 2px;
}
ul {
  list-style: none;
}
</style>
