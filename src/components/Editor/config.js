export default {
  // debug: true, // definition debug mode
  zIndex: 1,
  // Use one of the following two configurations to display the "Upload Image" tab. But don't use both at the same time!!
  uploadImgShowBase64: true,   // Use base64 to save the image
// uploadImgServer: '/upload', // Upload an image to the server
// uploadImgMaxSize: 3 * 1024 * 1024, // Limit the image size to 3M
// uploadImgMaxLength: 5, // Limit the maximum of 5 images that can be uploaded at a time
  /* 
  // Customize the upload parameters
  uploadImgParams: {
    token: 'abcdef12345'  // Attribute values are automatic encode ,Not required here encode
  },
  uploadImgHeaders: {
    'Accept': 'text/x-json'
  },
  */
  // uploadFileName: 'yourFileName', // Customize fileName
// withCredentials: true, // withCredentials（跨域传递 cookie）
// uploadImgTimeout: 3000, // 将 timeout 时间改为 3s
  /* //Customize the prompt method
  customAlert = (info) => {
    alert('Custom prompts:' + info)
  },
  */

  // Customize the delay time triggered by onchange, which is 200 ms by default
// onchangeTimeout: 1000, // unit ms
// onchange = html => html,

  // onfocus = _ => {}; Clicking on the rich text area triggers the execution of the onfocus function
// onblur = html => (); Click outside of rich text

  // pasteFilterStyle: false,  // Turn off filtering for pasted styles
// pasteIgnoreImg: true, // Ignore images in pasted content
// pasteTextHandle: context => content, // Customize the processing of pasted text content
  
  /* 
  // Custom configuration color (font color, background color)
  colors: [
    '#000000', '#eeece0', '#1c487f', '#4d80bf', '#c24f4a',
    '#8baa4a', '#7b5ba1', '#46acc8', '#f9963b', '#ffffff'
  ],
  */

  /*
  // Custom fonts
  Sources include: [
    "Arial",
    "Fear,"
    'Verdana'
  ],
  */
  // menus: [], // Customize menu configurations
  /*
  [
    'head',  // title
    'bold',  // Coarse body
    'italic',  // italic
    'underline',  // underline
    'strikeThrough',  // Strikethrough
    'foreColor',  // Text color
    'backColor',  // Background color
    'link',  // Insert a link
    'list',  // list
    'justify',  // Alignment
    'quote',  // quotation
    'emoticon',  // facial expression
    'image',  // Insert a picture
    'table',  // form
    'video',  // Insert a video
    'code',  // Insert the code
    'undo',  // quash
    'redo',  // repeat
  ],
  */
}