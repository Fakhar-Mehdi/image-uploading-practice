const cloudName = "hzxyensd5"; // replace with your own cloud name
const uploadPreset = "aoh4fpwm"; // replace with your own upload preset
let img_uploaded = false;
const $signupForm = document.querySelector("#signup-form");
const $successMessage = document.querySelector("#success");
const $dpMessage = document.querySelector("#dp-message");
const $form = document.getElementById("signup-form");
let dp;
// Remove the comments from the code below to add
// additional functionality.
// Note that these are only a few examples, to see
// the full list of possible parameters that you
// can add see:
//   https://cloudinary.com/documentation/upload_widget_reference

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      const img_info = result.info;
      //   console.log("Done! Here is the image info: ", img_info);
      $dpMessage.textContent = `${img_info.original_filename}.${img_info.format}`;
      $dpMessage.style.color = "green";
      img_uploaded = true;
      //   document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
      dp = result.info.secure_url;
      //save url in db
    }
    if (result.info === "hidden" && !img_uploaded) {
      $dpMessage.textContent = `Profile Picture is Required`;
      $dpMessage.style.color =
        $dpMessage.style.color === "red" ? "darkred" : "red";
    }
  }
);

//submit logic
//upload files is necessary
// You're Data is Submitted in the success id

$signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!img_uploaded) {
    $dpMessage.textContent = `Profile Picture is Required`;

    $dpMessage.style.color =
      $dpMessage.style.color === "red" ? "darkred" : "red";
    return;
  }
  // save everything in db

  const res = await fetch("http://localhost:3000/saveCredentials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: $form.elements["name"].value,
      email: $form.elements["email"].value,
      age: $form.elements["age"].value,
      dp,
    }),
  });
  if (res.status === 400)
    alert("Error Occurred!!! Please try again with valid data");
  else {
    $form.reset();
    $successMessage.textContent = "Thanks!!! You're Data is Submitted";
    $dpMessage.textContent = "";
    img_uploaded = false;
  }

  //add name of the use

  //   location.href = "/";
});
document.getElementById("profilePicture").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
