
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import Ruler from './Ruler';
import '../check.css'
// import Timer from './Timer';
// SKU: B00760033 for S&S
// Style#: PC90H for Sanmar Orange

const ImageEditor = () => {
 
  const [imageSrc, setImageSrc] = useState(""); 
  const [margin, setMargine]= useState(""); 
  const [actulaArt,setActualArt]= useState('')
  const [po, setPo] = useState('')
  const [num, setNum] = useState('0')
  const [design, setDesign]= useState('')
  const [rulerSize, setRulerSize]= useState(20)
  const [uploadedImage, setUploadedImage] = useState(null); 
  const [color, setColor] = useState(''); 
  const [Bcolor, setBColor] = useState('#ffffff'); 
  const [Bcolor2, setBColor2] = useState('transparent'); 
  const [style, setStyle] = useState(''); 
  const [location, setLocation] = useState('front');
  const [company, setCompany] = useState('sanmar'); 
  const [image, setImage] = useState(false); 
  const [up, setUp] = useState("42%"); 
  const [width,setWidth]=useState("20%")
  const [widthMock,setWidthMock]=useState("")
  const [mySheet,SetMysheet]=useState("")
  const [left, setLeft] = useState("33.5%"); 
  const[auto,setAuto]= useState(true);
  const [des,setDes]=useState("")
  const [FSpecNameValuesArray,setSpecNameValuesArray]=useState([])
  const[UniqueSizesArray,setUniq]=useState([])
  const[ client, setClient]=useState("")
  const[ brand,setBrand]=useState("")
  const [rulerColor, setRulerColor]=useState('red')
  const [pSize,setPsize]=useState("")
  const [Gsize,setSize]=useState("S")
  const [final, setFinal]=useState('')
  const [final2, setFinal2]=useState('')
  const [colorQnt,setColorQnt]=useState("0")
  const [SKUNumber,setskuNumber]=useState("")
  const[color1,setColor1]=useState("")
  const[color2,setColor2]=useState("")
  const[color3,setColor3]=useState("")
  const[color4,setColor4]=useState("")
  const[color5,setColor5]=useState("")
  const[color6,setColor6]=useState("")
  const[color7,setColor7]=useState("")
  const[color8,setColor8]=useState("")
  const[color9,setColor9]=useState("")
  const[color10,setColor10]=useState("")
  const[color11,setColor11]=useState("")
  const[color12,]=useState("")
  const [inputs,setInputs] = useState('');
  const [front,setFrontImage]=useState('');
  const [back,setBackImage]=useState('');
  const[c1,setC1]=useState("")
  const[c2,setC2]=useState("")
  const[c3,setC3]=useState("")
  const[c4,setC4]=useState("")
  const[c5,setC5]=useState("")
  const[c6,setC6]=useState("")
  const[c7,setC7]=useState("")
  const[c8,setC8]=useState("")
  const[c9,setC9]=useState("")
  const[c10,setC10]=useState("")
  const [a,setA]=useState("")
  const [b,setB]=useState("")
  const [c,setC]=useState("")
  const[c11,setC11]=useState("")
  const[ ArtMock,setArtMock]= useState("")
  const[actualG,setactualG]=useState('')
  const [isVisible, setIsVisible] = useState(false);
  const[c12,]=useState("")
  const[hexs,setHexes]=useState([])
  const p=[]
  const [myTop,setMyTop]=useState(-90)
  const [imageStyle, setImageStyle] = useState({
    width: `${width}`,
    height: 'auto',
    top: `${up}`,
    left: `${left}`,
  });
   const [imageStyle22,]=useState({
      width: '60%',
      height: 'auto',
      top: `50%`,
      left: `50%`,
    
  }); 
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
  const [initialRulerPosition, setInitialRulerPosition] = useState({ x: 0, y: 0 });
  const [rulerPosition, setRulerPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    if (event.button === 2) { // Right mouse button
      setIsDragging(true);
      setInitialMousePosition({ x: event.clientX, y: event.clientY });
      setInitialRulerPosition({ x: rulerPosition.x, y: rulerPosition.y });
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - initialMousePosition.x;
      const deltaY = event.clientY - initialMousePosition.y;
      const newRulerPosition = {
        x: initialRulerPosition.x + deltaX,
        y: initialRulerPosition.y + deltaY
      };
      setRulerPosition(newRulerPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  const currentDate =  `${year}-${month}${day}`
  const containerRef = useRef(null);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const getInfo = async () => {
    let url;
    if (location === "front" || location === "back" || location === "leftChest" ||location === "sfront" ||location === "sback") {
      setBColor("#ffffff");
    }

    if (company === "-") {
      setA("39.5%")
      setB('12.15%')
      setC('30.5%')
      setImageSrc("/images/22.png");
      setImage(true);
      setGenericImageStyle(location);
      return;
    }

    if (company === "sanmar") {
      setA("30%")
      setB('17.5%')
      setC('30%')
    
      setBColor2("white");
      if(auto){
        // console.log(location,company,auto,width)
        setSanmarImageStyle(location);
        // url =   "http://localhost:9000/mocks";
        url = "https://api-shipping-28612190fdf4.herokuapp.com/mocks";
      }else{
        setImageStyle2(location);
        // url =  "http://localhost:9000/mocks";
        url = "https://api-shipping-28612190fdf4.herokuapp.com/mocks";
        // console.log(location,company,auto,width)
      }

    } else if (company === "s&s") {
      setA("36%")
      setB('14%')
      setC('30%')
 
      setBColor2("white");
      if(auto){
        setSnsImageStyle(location);
        url = 
        // "http://localhost:9000/specs";
        "https://api-shipping-28612190fdf4.herokuapp.com/specs";

      }else{
        setImageStyle2(location);
        url =
        //  "http://localhost:9000/specs";
        "https://api-shipping-28612190fdf4.herokuapp.com/specs";
      }

    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(company === "sanmar" ? { color, size: "s", style } : { style, SKUNumber ,Gsize }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      if (company === "sanmar") {
        const data = await response.json();
        // const parser = new DOMParser();
        // const xml = parser.parseFromString(body, "application/xml");
        let Url=  "https://cdnm.sanmar.com"
        const backImageUrl = Url+data[0][0];
        const frontImageUrl = Url+data[1][0];
        const description = data[2][0];
        const pdfUrl = data[3][0];
        const sizes = data[4][0];
        
        // console.log('Back Image URL:', backImageUrl);
        // console.log('Front Image URL:', frontImageUrl);
        // console.log('Description:', description);
        // console.log('PDF URL:', pdfUrl);
        // console.log('Sizes:', sizes);

   
        SetMysheet(pdfUrl)
        // var eSize = xml.querySelector('availableSizes')?.textContent;
        setSize(sizes)
        // var desc= xml.querySelector('productDescription')?.textContent;
        setDes(description)
        setImageSrc(location === "front" || location === "sfront" ||location === "leftChest" ? frontImageUrl : backImageUrl);
        setImage(true);
      } 
      else if (company === "s&s") {
        const body = await response.json();
        const MyUrl = "https://cdn.ssactivewear.com/";
        // console.log(body)
        let spects= body[1]
        const sizeNamesArray = spects.map(obj => obj.sizeName);
        const uniqueSizesArray = [...new Set(sizeNamesArray)];
        setUniq(uniqueSizesArray);
        let v = spects.filter(product => product.sizeName ===Gsize)
        const specNameValuesArray = v.map(obj => ({ specName: obj.specName, value: obj.value }));
        setSpecNameValuesArray(specNameValuesArray);
        let styleName= body[0][0].styleName
        let desc= body[0][0].description
        const skuNumber = await findSKU(styleName, color, brand, Gsize);
        if (!skuNumber) {
          alert('SKU is not found! Please download the images manually!')
          return;
        }
        setDes(desc)  
        // setImageSrc(
        //   location === "front" || location === "sfront" ||location === "leftChest" ? MyUrl + front : MyUrl + back);
        setImage(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again later.");
    }
  };
const setImageStyle2 =(location)=>{
  bkColo()
  if (location === "front" || location === "back" || location === "sback" || location === "sfront") {
    setImageStyle({
      width: `${width}`,
      height: 'auto',
      top: `${up}`,
      left: `${left}`,
    });
  } else if (location === "leftChest") {
    setImageStyle({
      width: `${width}`,
      height: 'auto',
      top: `${up}`,
      left: `${left}`,
    });
  }
}

async function findSKU(styleName, colorName, brandName, sizeName) {
  const MyUrl = "https://cdn.ssactivewear.com/";
  try {
    const response = await fetch('./sku.json');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      if (
        data[i].brandName.toLowerCase().trim() === brandName.toLowerCase().trim() &&
        data[i].styleName.toLowerCase().trim() === styleName.toLowerCase().trim() &&
        data[i].colorName.toLowerCase().trim() === colorName.toLowerCase().trim() &&
        data[i].sizeName.toLowerCase().trim() === sizeName.toLowerCase().trim()
      ) {
        const skuNumber = data[i].sku;
        if (skuNumber === '') {
          throw new Error('SKU not found!');
        }
        // console.log(skuNumber);
        const front = data[i].colorFrontImage;
        const back = data[i].colorBackImage;
        if (front === '' || back === '') {
          throw new Error('No image found! Please download it manually.');
        }
        setFrontImage(front);
        setBackImage(back);
        setskuNumber(skuNumber);
        setImageSrc(
          location === "front" || location === "sfront" ||location === "leftChest" ? MyUrl + front : MyUrl + back);
        return skuNumber; // Return SKU number if found
        
      }
    }
    throw new Error('SKU not found!');
  } catch (error) {
    console.error('Error fetching SKU:', error);
    alert('Error fetching SKU. Please try again later.');
    return null; // Or handle error as required
  }
}

function ColorQntChange(e){
  setColorQnt(e.target.value)
  if(e.target.value>5){
    setMyTop(810)
  }else{
    setMyTop(-90)
  }
}
  const setSanmarImageStyle = (location) => {
    bkColo()
    if (location === "front" ) {
      setImageStyle({
        width: '25%',
        height: 'auto',
        top: `${up}`,
        left: `${left}`,
      });
    } 
    else if (location === "back"){
      const a= ((parseFloat(up) / 100)- parseFloat("3%") / 100)*100
      let aa= `${a}%`
           setImageStyle({
        width: '25%',
        height: 'auto',
        top: `${aa}`,
        left: `${left}`,
        });
    }
    else if (location === "sback") {
      setImageStyle({
        width: '20%',
        height: 'auto',
        top: `${up}`,
        left: `${left}`,
      });
    }
    else if (location === "sfront") {
      setImageStyle({
        width: '20%',
        height: 'auto',
        top: `${up}`,
        left: `${left}`,
      });
    }else if (location === "leftChest") {
      setImageStyle({
        width: '11%',
        height: 'auto',
        top: `${up}`,
        left: `${left}`,
      });
    }
  };

  const setGenericImageStyle = (location) => {
    bkColo()
    if (location === "front" || location === "back") {
      setImageStyle({
        width: '30%',
        height: 'auto',
        top: '32.5%',
        left: '39.3%',
      });
    } else if (location === "leftChest") {
      setImageStyle({
        width: '15.5%',
        height: 'auto',
        top: `32.25%`,
        left: `51.5%`,
      });
    }
    else if (location === "sfront" || location === "sback") {
      setImageStyle({
        width: '17%',
        height: 'auto',
        top: `32%`,
        left: `40.75%`,
      });
    }
  };

  const setSnsImageStyle = (location) => {
   bkColo()
    if (location === "front" ) {
      const a= ((parseFloat(up) / 100)- parseFloat("3.8%") / 100)*100
      let aa= `${a}%`
      setImageStyle({
        width: '25%',
        height: 'auto',
        top: `${aa}`,
        left: `${left}`,
      });
    } 
    else if( location === "back"){
      const a= ((parseFloat(up) / 100)- parseFloat("4.5%") / 100)*100
      const b= ((parseFloat(left) / 100)- parseFloat("0.2%") / 100)*100
      let aa= `${a}%`
      let bb= `${b}%`
      setImageStyle({
        width: '25%',
        height: 'auto',
        top: `${aa}`,
        left: `${bb}`,
      })
    }
    else if (location === "sback") {
      setImageStyle({
        width: '20%',
        height: 'auto',
        top: `${up}`,
        left: `${left}`,
      });
    }
    else if (location === "sfront") {
      setImageStyle({
        width: '20%',
        height: 'auto',
        top: `${up}`,
        left: `${left}`,
      });
    }else if (location === "leftChest") {
      setImageStyle({
        width: '12%',
        height: 'auto',
        top: `${up}`,
        left: `${left}`,
      });
    }
  };

  const downloadAsPDF = () => {
//  console.log("mytop:",myTop)
    const element = containerRef.current;
    if (!element) return;
    element.style.display = 'block';
    html2canvas(element, { 
      allowTaint: true,
      scale: 2, 
      useCORS: true  
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const imgWidth = 11;
      const imgHeight = 8.5;
      const pdf = new jsPDF('l', 'in', [9, 12]);
      pdf.addImage(imgData, 'JPEG', 0.5,0.2, imgWidth, imgHeight,"","",0);
      // `${year}-${month}${day}-${client}-${designName}-$Mockup--${poNumber}-${mockNumber}.pdf`
      pdf.save(`${currentDate}-${client}-${design}-Mockup-${po}.pdf`);
    });
  };
//scale art= (act art * scal G) / act G
 
  function calc3(e){
    setActualArt(e.target.value)
    let v = ((e.target.value*widthMock)/actualG).toFixed(2)
    setFinal2(v)
   }
  function calc2(){
    
    let v = (ArtMock*21.77*0.063).toFixed(2)

    setFinal(v)
   }
   function calc(e){
    setactualG(e.target.value) //actual g 
    let v = (ArtMock*21.77*0.063).toFixed(2)
    // let v = ((actulaArt*widthMock)/(e.target.value)).toFixed(2)

    setFinal(v)
    
   }
   function change(){
    setIsVisible(!isVisible)
    if(isVisible){
      setMargine('20px')}
    else if(!isVisible){setMargine('420px')}
   }
   console.log(margin)
  const changeBackgroundColor = () => {
    var color = document.getElementById("colorInput").value;
    setBColor(color);
  };

  const changeBackgroundColor2 = () => {
    var color = document.getElementById("colorInput").value;
    setBColor2(color);
  };
  function findPMS(pms) {
    fetch('./panton.json')
    .then(response => response.json())
    .then(   
      data => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].pantone.toLowerCase() === pms.toLowerCase()) {
        
        let HexNumber= data[i].hex;
        hexs.push(HexNumber)
        setHexes(hexs)
        // console.log(hexs)
      }
      }
    }
    )
    return "";
  }
 
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      let v=Object.keys(inputs).length
      let o=[]
      for (var i=1; i<v+1; i++){
        o.push(inputs[i])
      }
      for(let i =0; i<o.length; i++){
        findPMS(o[i])
      }
     if(v<2){ 
      setColor1(inputs[1])
    }
    if(v<3){ 
      setColor1(inputs[1]) 
      setColor2(inputs[2])
    }
     if(v<4){ 
      setColor1(inputs[1]) 
       setColor2(inputs[2])
        setColor3(inputs[3])
      };
     if(v<5){ 
      setColor1(inputs[1]) 
       setColor2(inputs[2])
        setColor3(inputs[3])
         setColor4(inputs[4])
      };
     if(v<6){ 
      setColor1(inputs[1]) 
       setColor2(inputs[2])
        setColor3(inputs[3])
         setColor4(inputs[4])
          setColor5(inputs[5])
        }
     if(v<7){ 
      setColor1(inputs[1]) 
       setColor2(inputs[2])
        setColor3(inputs[3])
         setColor4(inputs[4])
          setColor5(inputs[5])
           setColor6(inputs[6])
          } 
     if(v<8){ 
      setColor1(inputs[1]) 
       setColor2(inputs[2])
        setColor3(inputs[3])
         setColor4(inputs[4])
         setColor5(inputs[5])
          setColor6(inputs[6])
           setColor7(inputs[7])
          }   
     if(v<9){ 
      setColor1(inputs[1]) 
       setColor2(inputs[2])
        setColor3(inputs[3])
         setColor4(inputs[4])
          setColor5(inputs[5])
           setColor6(inputs[6])
           setColor7(inputs[7])
           setColor8(inputs[8])
          } 
     if(v<10){ 
      setColor1(inputs[1]) 
       setColor2(inputs[2])
        setColor3(inputs[3])
         setColor4(inputs[4])
          setColor5(inputs[5])
           setColor6(inputs[6])
           setColor7(inputs[7])
           setColor8(inputs[8])
           setColor9(inputs[9])
          } 
     if(v<11){ 
      setColor1(inputs[1]) 
       setColor2(inputs[2])
        setColor3(inputs[3])
         setColor4(inputs[4])
          setColor5(inputs[5])
           setColor6(inputs[6])
            setColor7(inputs[7])
            setColor8(inputs[8])
            setColor9(inputs[9])
            setColor10(inputs[10])
          } 
     if(v<12){ 
      setColor1(inputs[1]) 
       setColor2(inputs[2])
        setColor3(inputs[3])
         setColor4(inputs[4])
          setColor5(inputs[5])
           setColor6(inputs[6])
            setColor7(inputs[7])
            setColor8(inputs[8])
            setColor9(inputs[9])
            setColor10(inputs[10])
             setColor11(inputs[11])
            } 
    }
  };
  
const onChangeForField = ({ target }) => setInputs(prevInputs => (
  { ...prevInputs, [target.name]: target.value }
)
)
if (colorQnt>0){
  for (let i =1; i<=(colorQnt); i++){
    p.push(i)
 
  }
}
function bkColo(){
  if(hexs.length<2){
    setC1(hexs[0])
  }
  if(hexs.length<3){
    setC1(hexs[0])
    setC2(hexs[1])
  }
  if(hexs.length<4){
    setC1(hexs[0])
    setC2(hexs[1])
    setC3(hexs[2])
  }
  if(hexs.length<5){
    setC1(hexs[0])
    setC2(hexs[1])
    setC3(hexs[2])
    setC4(hexs[3])
  }
  if(hexs.length<6){
    setC1(hexs[0])
    setC2(hexs[1])
    setC3(hexs[2])
    setC4(hexs[3])
    setC5(hexs[4])
  }
  if(hexs.length<7){
    setC1(hexs[0])
    setC2(hexs[1])
    setC3(hexs[2])
    setC4(hexs[3])
    setC5(hexs[4])
    setC6(hexs[5])
  }
  if(hexs.length<8){
    setC1(hexs[0])
    setC2(hexs[1])
    setC3(hexs[2])
    setC4(hexs[3])
    setC5(hexs[4])
    setC6(hexs[5])
    setC7(hexs[6])
  }
  if(hexs.length<9){
    setC1(hexs[0])
    setC2(hexs[1])
    setC3(hexs[2])
    setC4(hexs[3])
    setC5(hexs[4])
    setC6(hexs[5])
    setC7(hexs[6])
    setC8(hexs[7])
  }
  if(hexs.length<10){
    setC1(hexs[0])
    setC2(hexs[1])
    setC3(hexs[2])
    setC4(hexs[3])
    setC5(hexs[4])
    setC6(hexs[5])
    setC7(hexs[6])
    setC8(hexs[7])
    setC9(hexs[8])
  }
  if(hexs.length<11){
    setC1(hexs[0])
    setC2(hexs[1])
    setC3(hexs[2])
    setC4(hexs[3])
    setC5(hexs[4])
    setC6(hexs[5])
    setC7(hexs[6])
    setC8(hexs[7])
    setC9(hexs[8])
    setC10(hexs[9])
  }
  if(hexs.length<12){
    setC1(hexs[0])
    setC2(hexs[1])
    setC3(hexs[2])
    setC4(hexs[3])
    setC5(hexs[4])
    setC6(hexs[5])
    setC7(hexs[6])
    setC8(hexs[7])
    setC9(hexs[8])
    setC11(hexs[10])
  }

  
}

function companyChange(e){
  setCompany(e.target.value)
  setStyle("")
  setColorQnt("0")
  setPsize('')
  setColor("")
  setBrand('')
  setSize("S")
  setLocation("front")
}
// console.log(a,b,c)
  return (
    <>
    
    {/* <Timer/> */}
    {/* <div className="🤚" onClick={()=>setUploadedImage("")}>
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="🌴"></div>		
	<div className="👍"></div>
</div> */}
<hr></hr>
      <div style={{  maxWidth: "12%", float: "left"}}>
      <label>Client:</label>
            <input style={{width: '100%', margin: 10 }} value={client} placeholder="Client name" onChange={e => setClient(e.target.value)} />
            <label>PO:</label>
            <input style={{width: '100%', margin: 10 }} value={po} placeholder="Client name" onChange={e => setPo(e.target.value)} />
            <label>Design:</label>
            <input style={{width: '100%', margin: 10 }} value={design} placeholder="Client name" onChange={e => setDesign(e.target.value)} />
        <label>Provider:</label>
        <select onChange={companyChange} style={{ margin: 10, width: '104%', height: 35 }}>
          <option value="sanmar">Sanmar</option>
          <option value="s&s">S&S</option>
          <option value="-">Generic</option>
        </select>
        <label>Location:</label>
        <select onChange={e => setLocation(e.target.value)} style={{ margin: 10, width: '104%', height: 35 }}>
          <option value="front">Full Front</option>
          <option value="back">Full Back</option>
          <option value="sfront">Small Full Front</option>
          <option value="sback">Small Full Back</option>
          <option value="leftChest">Left Chest</option>
        </select>
        <label>Imprint Size:</label>
            <input style={{  width: '100%',margin: 10 }} value={pSize} placeholder="Imprint size" onChange={e => setPsize(e.target.value)} />
            <label>Color#:</label>
            <select style={{margin:10,  width: '104%', height:35}} onChange={e => ColorQntChange(e)}>  
                          <option value="0">-</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                        </select>
                        {colorQnt>0 && (
                           <>
                            {p.map((index)=>(
                              <div key ={index} ><p> Color {index}:</p>
                                <input style={{ width: '100%',margin:10}}key={index} name={index} onChange={onChangeForField} value={inputs.name}
                                placeholder={`Enter ink info PMS ${index}...`}/>
                              </div>
                            ))}
                             </>
                            )
                          }
{auto && company === "-" && (
          <>
             <div id="colorPicker" style={{ maxwidth:"20%"}}>
        <input type="color" id="colorInput" style={{ margin: 10, width: 100 }} />
      </div>
                   <button id="btn1"
        style={{ marginTop:10, marginLeft:10, backgroundColor: "blue", width: "100%", maxwidth:'100%' }} onClick={changeBackgroundColor2}>
          Change T-shirt's Color
        </button>
          <button style={{marginTop:10, marginLeft:10,marginBottom: 20, zIndex: 2, top: '10px', left: '10px',  width: '100%', maxwidth:'100%'}} onClick={getInfo}>
          Load Image
        </button>
        </>
)}
        {auto && company === "sanmar" && (
          <>
            <label>Brand:</label>
            <input style={{  width: '100%',margin: 10 }} value={brand} placeholder="Brand of garment" onChange={e => setBrand(e.target.value)} />
            <label>Style#:</label>
            <input style={{  width: '100%',margin: 10 }} value={style} placeholder="Style" onChange={e => setStyle(e.target.value)} />
            <label>Color:</label>
            <input style={{  width: '100%',margin: 10 }} value={color} placeholder="Color of garment" onChange={e => setColor(e.target.value)} />
            <a style={{marginRight:320}}href={mySheet}> See Spec Sheet </a>
            <button id="btn3" style={{ marginLeft:10,marginBottom: 20, zIndex: 2, top: '10px', left: '10px', width:'100%' , maxwidth:'100%'}} onClick={getInfo}>
          Load Image
        </button>
        <div id="colorPicker" style={{ maxwidth:"20%"}}>
        <input type="color" id="colorInput" style={{ margin: 10, width: 100 }} />
      </div>
        <button id="btn1" style={ { marginLeft:10,backgroundColor:'blue',marginBottom: 20, zIndex: 2, top: '10px', left: '10px', width:'100%', maxwidth:'100%' }} onClick={changeBackgroundColor}>
          Change Background Color
        </button>
        {uploadedImage && (
            <div  style={{width:'100vw', fontSize:'0.5rem', marginBottom:'20px',border:'6px ridge grey', marginTop:`${margin}`}}>
                      <p style={{marginLeft:'20px'}}>Available Sizes:</p>
                       <p style={{marginLeft:'30px'}}>{
                      Gsize
                      }</p>  
                            <p style={{fontSize:'1.7rem',marginLeft:'20px'}}>Description:</p>
                          <div >
                          <p style={{fontSize:'1rem',marginLeft:'30px'}}>{des}</p>
                            </div>
                      </div>)}
          </>
        )}
        {auto && company === "s&s" && (
          <>
            <label>Garment Size:</label>
            <select style={{margin:10,  width: '104%', height:35}} onChange={e => setSize(e.target.value)}>  
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="2XL">2XL</option>
              <option value="3XL">3XL</option>
              <option value="4XL">4XL</option>
              <option value="5XL">5XL</option>
            </select>
            <label>Brand:</label>
            <input style={{  width: '100%',margin: 10 }} value={brand} placeholder="Brand of garment" onChange={e => setBrand(e.target.value)} />
            <label>Style#:</label>
            <input style={{ width: '100%', margin: 10 }} value={style} placeholder="Style" onChange={e => setStyle(e.target.value)} />
            <label>Color:</label>
            <input style={{  width: '100%',margin: 10 }} value={color} placeholder="Color of garment" onChange={e => setColor(e.target.value)} />
            <button id="btn5"style={{ marginLeft:10,marginBottom: 20, zIndex: 2, top: '10px', left: '10px', width:"100%", maxwidth:'100%' }} onClick={getInfo}>
          Load Image
        </button>
        <div id="colorPicker" style={{ maxwidth:"20%"}}>
        <input type="color" id="colorInput" style={{ margin: 10, width: 100 }} />
      </div>
        <button id="btn1" style={{ marginLeft:10,backgroundColor:'blue',marginBottom: 20, zIndex: 2, top: '10px', left: '10px', width:'100%', maxwidth:'100%' }} onClick={changeBackgroundColor}>
          Change Background Color
        </button>
        {uploadedImage && (
                      <div  style={{width:'100vw', fontSize:'0.5rem', marginBottom:'20px',border:'6px ridge grey', marginTop:`${margin}`}}>
                      <p style={{marginLeft:'20px'}}>Available Sizes:</p>
                      <p style={{marginLeft:'30px'}}>{[...UniqueSizesArray].join(", ")}</p> 
                           <ul>
      {FSpecNameValuesArray.map((item, index) => (
        <li key={index}>
          <strong>{item.specName}: </strong> {item.value}
        </li>
      ))}
    </ul>
                      <p style={{fontSize:'1.7rem',marginLeft:'20px'}}>Description:</p>
                          <div style={{fontSize:'0.7rem',marginLeft:'30px'}}
                       dangerouslySetInnerHTML={{ __html: des }} />
                     </div>)}
                     </>
        )}
      </div>
      {image && (
        <>
          <div
            id="pdf-content"
            ref={containerRef}
            style={{
              // border:'1px solid red', 
              marginTop:`${myTop}`,
              marginRight:"5px",
              position: 'relative',
              width: '11.5in',
              height: '9in',
              overflow: 'hidden',
              backgroundColor: `${Bcolor2}`,
              backgroundImage: `url(${imageSrc}), url(/documents/logo/mockBackground.PNG)`,
              // backgroundColor: `transparent, transparent`,
              backgroundRepeat: 'no-repeat , no-repeat',
              // backgroundSize: '39.5%, 1110px 867px',
              // backgroundPosition: `12.02% 30.5%, 50% calc(50% )`,
              backgroundSize: `${a}, 1110px 867px`,
              backgroundPosition: `${b} ${c}, 50% calc(50% )`,
              // backgroundAttachment: 'fixed,fixes',
              // clipPath: (' ,polygon(0% 0%, 0% 100%, 25% 100%, 13% 22%, 39% 22%, 39% 53%, 11% 53%, 25% 100%, 100% 100%, 100% 0%)'),
//               20% means that the background image is horizontally positioned 20% from the left edge of its containing element.
//                calc(50% - 58px) means that the background image is vertically positioned 50% from the top edge of its containing element, 
//                  and then an additional 58 pixels are subtracted from this value. 
//                So, it's effectively setting the vertical position 58 pixels above the center (50%) of the containing element.
              float: "right"
            }}
          >
            {uploadedImage && (
              <>
             {isVisible && (
  <div>
{/* <Ruler lengthInches={rulerSize} rotation={`rotate(${num}deg)`} color={rulerColor}/>  */}
</div>
             )}
              <div id='ptr'
              
              style={{  
                // border:'1px solid red',
              // backgroundColor: `${Bcolor2}`,
              marginBottom:'10px',width:'40%', height:'58%', float:'left',marginTop:'10%', marginLeft:"100px"}}>
              <img
                id='payam'
                src={uploadedImage}
                alt="Uploaded"
                style={{  
                  position: 'relative',
                  ...imageStyle,
                  backgroundColor: 'transparent',
                  left: rulerPosition.x,
                  top: rulerPosition.y,
                }}
                /////
               
       
             
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onContextMenu={handleContextMenu}



                /////
              />
              </div>
              {/* <div style={{border:'1px solid red', width:'500px', height:'500px'}}></div> */}
              <div style={{  backgroundColor: `${Bcolor}`, marginBottom:'10px',width:'40%', height:'57.5%', float:'right',marginTop:'10%', marginRight:"20px"}}>
              <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                position: 'relative',
                ...imageStyle22,
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'transparent',
              }}
            />
              </div>
              <table style={{ borderSpacing: '0',borderCollapse: "collapse"}}>
                <tbody>
                <tr style={{height:'20px'}}>
                <th style={{fontSize:'0.8rem',width:'10%'}}></th>
                <th style={{fontSize:'0.8rem',width:'13%'}}></th>
                <th style={{fontSize:'0.8rem',width:'10%'}}></th>
                <th style={{fontSize:'0.8rem',width:'13%'}}></th>
                <th style={{fontSize:'0.8rem',width:'7%'}}></th>
                <th style={{fontSize:'0.8rem',width:'12%'}}></th>
                <th style={{fontSize:'0.8rem',width:'10%'}}></th>
                <th style={{fontSize:'0.8rem',width:'12%'}}></th>
                <th style={{fontSize:'0.8rem',width:'10%'}}></th>
                <th style={{fontSize:'0.8rem',width:'5%'}}></th>
              </tr>
                <tr style={{height:'20px'}}>
                  <td style={{fontSize:'0.82rem',textAlign:"center", borderColor:'transparent'}}>Garment Brand:</td>
                  <td style={{backgroundColor:"#d4d5d5",textAlign:"center", borderColor:'transparent'}}>{brand.toUpperCase()}</td>
                  <td style={{fontSize:'0.82rem',textAlign:"center", borderColor:'transparent'}}>Garment Style#:</td>
                  <td style={{backgroundColor:"#d4d5d5",textAlign:"center", borderColor:'transparent'}}>{style.toUpperCase()}</td>
                  <td style={{fontSize:'0.82rem',textAlign:"center", borderColor:'transparent'}}>Garment Color:</td>
                  <td style={{backgroundColor:"#d4d5d5",textAlign:"center", borderColor:'transparent'}}>{color.toUpperCase()}</td>
                  <td style={{fontSize:'0.82rem',textAlign:"center", borderColor:'transparent'}}>Printing Type:</td>
                  <td style={{backgroundColor:"#d4d5d5",textAlign:"center", borderColor:'transparent'}}>Screen Printing</td>
                  <td style={{fontSize:'0.82rem',textAlign:"center", borderColor:'transparent'}}>Version:</td>
                  <td style={{backgroundColor:"#d4d5d5",textAlign:"center", borderColor:'transparent'}}>1</td>
                </tr>
                </tbody>
              </table>              
              <table style={{ marginTop:'-5px',borderSpacing: '0',borderCollapse: "collapse"}}>
              <tbody>
              <tr style={{height:'15px'}}>
              <th style={{fontSize:'0.8rem',width:'10%'}}></th>
                <th style={{fontSize:'0.8rem',width:'13%'}}></th>
                <th style={{fontSize:'0.8rem',width:'10%'}}></th>
                <th style={{fontSize:'0.8rem',width:'13%'}}></th>
                <th style={{fontSize:'0.8rem',width:'7%'}}></th>
                <th style={{fontSize:'0.8rem'}}></th>
                </tr>
                <tr style={{height:'20px'}}>
                  <td style={{fontSize:'0.82rem',textAlign:"center", borderColor:'transparent'}}>Imprint Location:</td>
                  <td style={{backgroundColor:"#d4d5d5",textAlign:"center", borderColor:'transparent'}}>{location.toUpperCase()}</td>
                  <td style={{fontSize:'0.82rem',textAlign:"center", borderColor:'transparent'}}>Imprint Size:</td>
                  <td style={{backgroundColor:"#d4d5d5",textAlign:"center", borderColor:'transparent'}}>{pSize}</td>
                  <td style={{fontSize:'0.82rem',textAlign:"center", borderColor:'transparent'}}>Colors:</td>
                  <td style={{rowSpan:'2', borderColor:'transparent'}}>
                    <span style={{backgroundColor:`${c1}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color1} </span>
                    <span style={{backgroundColor:`${c2}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color2}   </span>
                    <span style={{backgroundColor:`${c3}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color3}  </span>
                    <span style={{backgroundColor:`${c4}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color4}   </span>
                    <span style={{backgroundColor:`${c5}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color5}   </span>
                    <span style={{backgroundColor:`${c6}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color6}   </span>
                    <span style={{backgroundColor:`${c7}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color7}   </span>
                    <span style={{backgroundColor:`${c8}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color8}   </span>
                    <span style={{backgroundColor:`${c9}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color9}   </span>
                    <span style={{backgroundColor:`${c10}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color10}   </span>
                    <span style={{backgroundColor:`${c11}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color11}   </span>
                    <span style={{backgroundColor:`${c12}`, color:"white", fontSize:'1.3rem',padding:'1px',marginRight:'3px'}}>{color12}  </span>
                  </td>
                </tr>
                </tbody>
              </table>
            </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
            />
          </div>
          <div style={{ width: "14%" ,border:'10px ridge orange', marginLeft:'15%', padding:'10px'}}>
            <label>Top:</label>
            <input style={{ margin: 10, width:'70px' }} value={up} placeholder="top" onChange={e => setUp(e.target.value)} />
            <label>Left:</label>
            <input style={{ margin: 10 , width:'70px'}} value={left} placeholder="left" onChange={e => setLeft(e.target.value)} />
            <button style={{ marginTop: 25, backgroundColor: "green", width: '100%',marginBottom:20, maxwidth:'100%' }} onClick={downloadAsPDF}>Download as PDF</button>
            <button style={{ marginBottom: 20, zIndex: 2, top: '10px', left: '10px', width:'100%', maxwidth:'100%'}} onClick={getInfo}>
          Load Image
        </button>
                        <label className="container">
                            <input id="ch"  type="checkbox"  onChange={()=>setAuto(!auto)} checked={!auto} />    
                            <div className="checkmark"></div>
                       </label>
                        <p style={{marginTop:38}} id="s">Adjust design manually</p>
                        {!auto && (
                 <><label style={{marginLeft:''}}>Scale:</label><input style={{ marginLeft: '10px' , width:'70px'}} value={width} placeholder="width" onChange={e => setWidth(e.target.value)} />
        </>
          )}
 
                                <label className="container">
                            <input id="ch"  type="checkbox"  onChange={change} checked={isVisible}/>    
                            <div className="checkmark"></div>
                       </label>
                        <p style={{marginTop:38}} id="s">Need Ruler?</p>
      {isVisible &&(
      <><label>Rotate:</label><input style={{ margin: 10, width: '70px' }} value={num} placeholder="Rotate the ruler" onChange={e => setNum(e.target.value)} />
      <label>Ruler size:</label>
      <select style={{margin:10,  width: '77px', height:35}} onChange={e => setRulerSize(e.target.value)}>  
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
      <option value="60">60</option>
      </select>
      <label>Ruler Color:</label>
      <select style={{margin:10,  width: '77px', height:35}} onChange={e => setRulerColor(e.target.value)}>  
      <option value="red">Red</option>
      <option value="yellow">Yellow</option>
      <option value="white">White</option>
      <option value="black">Black</option>
      </select>
      <label>Chest/mockup</label>
      <input style={{  margin: '10px' , width:'170px'}} value={widthMock} placeholder="Chest size on mockup" onChange={e => setWidthMock(e.target.value)} />
      <label>Art/mockup</label>
      <input style={{  margin: '10px' , width:'170px'}} value={ArtMock} placeholder="Art size on mockup" onChange={e => setArtMock(e.target.value)} />
      <label>Actual garment size</label>
      <input style={{  margin: '10px' , width:'170px'}} value={actualG} placeholder="Actual garment chest size" onChange={calc} />
      <label>Art Size of View:</label>
      <input style={{  margin: '10px' , width:'70px'}} value={final}  />
      <img src="/images/reload.png" alt='Payam' style={{width:'50px', marginLeft:'140px', marginTop:'-50px'}} onClick={calc2} />
      
      <p>------ Or ------</p>
      <label>Actual Art size</label>
      <input style={{  margin: '10px' , width:'170px'}} value={actulaArt} placeholder="Actual Art size" onChange={calc3} />
      <label>Est. size of View:</label>
      <input style={{  margin: '10px' , width:'70px'}} value={final2}  />

      </>
      )}
          </div>
        </>
      )}
    </>
  );
};
export default ImageEditor;

/////cool stuff : https://neumorphism.io/#e0e0e0    https://bennettfeely.com/clippy/      https://9elements.github.io/fancy-border-radius/  
//19060 off white s&s gildan