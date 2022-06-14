import "../assets/css/style.css";

const app = document.getElementById("app");
app.innerHTML = `

<h1>Drag and Drop</h1>
<div class="uploader">
    
<!-- <div id="item-0" class="dragme" draggable="true"></div> -->
<p>Accepts only .jpg,.png,.svg</p>    
<div class="dropzone"> Drag Here To Upload</div>
<div class='list'></div>
</div>

<style>
    .uploader {
        box-sizing:border-box;
        max-width:90%;
        border-radius:10px;
        border-bottom:3px solid #d2d5da;
        margin:25px auto;
        padding:25px;
        background:#fff;
    }

    .dragme {

        background:cornflowerblue;
        border-radius:5px;
        width:50px;
        height:50px;

    }
    .dropzone {
        border-radius:5px;
        margin-top:25px;
        padding:25px;
        border:2px dashed #d2d5da;
        background:f1f2f5;
    }

    .active {
        background:#ebfff6;
        border-color:#24b273;
    }

</style>

`;

const init = () => {
  //   const dragme = document.querySelector(".dragme");
  const dropzone = document.querySelector(".dropzone");
  const list = document.querySelector(".list");

  //   dragme.addEventListener("dragstart", (e) =>
  //     e.dataTransfer.setData("text/plain", e.target.id)
  //   );

  dropzone.addEventListener("dragenter", (e) => {
    e.target.classList.add("active");
  });

  dropzone.addEventListener("dragleave", (e) => {
    e.target.classList.remove("active");
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("active");
    // const id = e.dataTransfer.getData("text/plain");
    // const element = document.getElementById(id);
    // dropzone.append(element);

    const { files } = e.dataTransfer;
    handleFileUpload(files);
  });

  const showFilePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div style = 'display:flex;'>
        <img src="${e.target.result}"  alt = "${file.name}" style="width:20px;margin-right:10px " />
        <p>${file.name}<span>${file.size}bytes</span></p>
      </div>
      
      `;
      list.append(div);
    });
  };

  const isAllowedType = (file) => {
    return ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type);
  };

  const handleFileUpload = (files) => {
    const filesToUpload = [...files].filter(isAllowedType);
    filesToUpload.forEach(showFilePreview);
  };

  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", (e) => e.preventDefault());
};

if ("draggable" in document.createElement("div")) {
  init();
}
