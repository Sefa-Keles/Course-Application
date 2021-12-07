//Course Constructor
class Course{
    constructor(title, instructor, image){
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }    
}

//UI Constructor to manage UI functions
class UI{

    //Add Course Object to Table List
    addCourseToList = course => {
        const list = document.getElementById("course-list");
    
        var html = `
            <tr>
                <td><img src="static/img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" class= "btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        `;
    
        list.innerHTML += html;
    }

    //Clear Form Fields
    clearForm = () => {
        document.getElementById("title").value = "";
        document.getElementById("instructor").value = "";
        document.getElementById("image").value = "";
    }
    
    //Remove Selected Course From Table
    removeSelectedCourse = deleteButton => {
        deleteButton.parentElement.parentElement.remove();
    }
    
    //Show Notification Message
    showAlert = (message, classType) => {
        var alert = `
            <div class= "alert alert-${classType}">
                ${message}
            </div>
        `;
    
         const row = document.querySelector(".row");

         //Add Alert Message Before Row Element
         row.insertAdjacentHTML("beforeBegin",alert);

         //Remove Notification Message After 3 Seconds
         setTimeout(()=>{
            document.querySelector(".alert").remove();
         },3000);
    }
}

//Submit Form Fields
document.getElementById("form").addEventListener("submit", function(e){
    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    //Create Course Object
    const course = new Course(title, instructor, image);

    //Create UI Object
    const ui = new UI();

    if(title === "" | instructor === "" | image === ""){
        ui.showAlert("Please Fill In All Fields!", "warning")
    }else{
        ui.addCourseToList(course);
        ui.clearForm();
        ui.showAlert("New Course Has Been Added Successfully!", "success")
    }

    e.preventDefault();
});

//Selection Of The Area To Be Deleted
document.getElementById("course-list").addEventListener("click", function(e){

    //Create UI Object
    const ui = new UI();
    if(e.target.classList.contains("delete")){
        ui.removeSelectedCourse(e.target);
        ui.showAlert("Course Has Been Removed Successfully!", "danger")
    }
})