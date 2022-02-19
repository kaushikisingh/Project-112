prediction1="";
prediction2="";

Webcam.set({
    width:400,
    height:400,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function snap()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WHGKtNYXh/model.json' ,modelLoaded);
function modelLoaded()
{
    console.log("model Loaded");
}
function speak()
{
    var synth=window.speechSynthesis;
    speakdata1="first prediction is " +prediction1;
    speakdata2=" second prediction is " +prediction2;
    var uttar=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(uttar);
}
function check()
{
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(results);
      document.getElementById("result_name").innerHTML=results[0].label;
      document.getElementById("result_name2").innerHTML=results[1].label;
      prediction1=results[0].label;
      prediction2=results[1].label;
      speak();

      if(results[0].label=="Amazing")
      {
        document.getElementById("result_emoji").innerHTML="&#128076;";   
      }
     if(results[0].label=="Best")
      {
        document.getElementById("result_emoji").innerHTML="&#128077;";
      }
      if(results[0].label=="Victory"){
        document.getElementById("result_emoji").innerHTML="&#9996;;"; 
      }

      if(results[1].label=="Amazing")
      {
        document.getElementById("result_emoji2").innerHTML="&#128076;";   
      }
      if(results[1].label=="Best")
      {
        document.getElementById("result_emoji2").innerHTML="&#128077;"; 
      }
      if(results[1].label=="Victory"){
        document.getElementById("result_emoji2").innerHTML="&#9996;"; 
      }
    }
}