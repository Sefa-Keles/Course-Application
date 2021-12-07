//Course Constructor
class Course{
    constructor(title, instructor, image){
        //Create Randon ID for Course
        this.courseId = Math.floor(Math.random()*10000)
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
                <td><a href="#" data-id="${course.courseId}" class= "btn btn-danger btn-sm delete">Delete</a></td>
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

class Storage {

    static getCourse(){
        let courses;
        
        if(localStorage.getItem("courses") === null){
            courses = [];
        }else{
            courses = JSON.parse(localStorage.getItem("courses"));
        }

        return courses;
    }

    static displayCourse(){
        const courses = Storage.getCourse();
        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
    }

    static setCourse(course){
        const courses = Storage.getCourse();
        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));
    }

    static deleteCourse(course){
        const id = course.getAttribute("data-id");
        const courses = Storage.getCourse();
        courses.forEach((course, index) => {
            if(course.courseId == id){
                courses.splice(index,1)
            }
        });
        
        //Exporting the final version to LS after deleting an element from LS
        localStorage.setItem("courses", JSON.stringify(courses));
    }
}

//Event To Be Triggered As Soon As The DOM Is Loaded On The Page
document.addEventListener("DOMContentLoaded", Storage.displayCourse);

//Submit Form Fields
document.getElementById("form").addEventListener("submit", e => {
    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    //Create Course Object
    const course = new Course(title, instructor, image);

    //Create UI Object
    const ui = new UI();

    if(title === "" || instructor === "" || image === ""){
        //Show Notification Message
        ui.showAlert("Please Fill In All Fields!", "warning")
    }else{
        //Add Course To Table List
        ui.addCourseToList(course);
        //Save Course To Local Storage
        Storage.setCourse(course);
        //Clear All Fields
        ui.clearForm();
        //Show Notification Message
        ui.showAlert("New Course Has Been Added Successfully!", "success")
    }

    e.preventDefault();
});

//Selection Of The Area To Be Deleted
document.getElementById("course-list").addEventListener("click", e => {

    //Create UI Object
    const ui = new UI();
    if(e.target.classList.contains("delete")){
        ui.removeSelectedCourse(e.target);
        //Delete Course From Local Storage
        Storage.deleteCourse(e.target);
        //Show Notification Message
        ui.showAlert("Course Has Been Removed Successfully!", "danger")
    }
})