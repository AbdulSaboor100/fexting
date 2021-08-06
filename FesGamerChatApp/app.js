////////////KeyOfFireBase//////////////
var firebaseConfig = {
    apiKey: "AIzaSyBIwKQENZ-gDjgRqmJqLy_63NdKAF_NS0Y",
    authDomain: "vipp-a7ca3.firebaseapp.com",
    projectId: "vipp-a7ca3",
    storageBucket: "vipp-a7ca3.appspot.com",
    messagingSenderId: "763710859487",
    appId: "1:763710859487:web:240e79b2a780877e7b616a",
    measurementId: "G-YLMYRM7DEC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
////////////KeyOfFireBase//////////////

///////////////////Getting Element From DOM//////////////////////
let email = document.getElementById('email');
let Username = document.getElementById('UserName');
let password = document.getElementById('password');
///////////////////Getting Element From DOM//////////////////////


////////////////Functions///////////////////
let searchUser = document.getElementById('searchUser');
let container = document.getElementById('container');
let userDom = document.getElementById('userDom');
var successBox1 = document.getElementById('successBox1');
let errorBox = document.getElementById('errorBox');
errorBox.style.display = 'none';

let keyGeneratedUID = [];
let errorUserNotFounds = [];
let auth = firebase.auth()
let db = firebase.firestore()
let dataSaveObject;
 


//////////////////////////////////////////
 function checkUsername(){
    db.collection('users').get()
    .then(function(data){
        data.forEach(function(userData){
            if(userData.data().username === Username.value){
                setTimeout(function(){
                    errorBox.style.display = 'none';
                  },3000)
                errorBox.innerHTML = '<center>' + 'Username Already Exits' + '</center>'
                errorBox.style.display = 'block';
            }else{
                
            }
        })
    })
 }
/////////////////////////////////////////

function registerUser(){
    


                auth.createUserWithEmailAndPassword(email.value,password.value)
                .then(function(data){
            let multiUs = data.user
            dataSaveObject = {
            email : multiUs.email,
            username : Username.value,
            UID : multiUs.uid
            };
            
            
            
            saveDataToFireStore(dataSaveObject)

     
            
            // window.location.replace('components/home.html');
            /////////////
            email.value = '';
            Username.value = '';
            password.value = '';
            setTimeout(function(){
            successBox1.style.display = 'none';
            },3000)
            
            successBox1.innerHTML = '<center>Go To Login Page</center>';
            successBox1.style.display = 'block';
            
            
            })
            
            
            
            .catch(function(error){
            console.log(error.message)
            setTimeout(function(){
                errorBox.style.display = 'none';
              },3000)
            errorBox.innerHTML = '<center>' + error.message + '</center>'
            errorBox.style.display = 'block';
            
            })


 //////////////////////////////////////////////////////////////////
   

   

}

successBox1.style.display = 'none'; 
errorBox.style.display = 'none';
function loginUser(){
    auth.signInWithEmailAndPassword(email.value,password.value)
        .then(function(data){
                window.location.replace('home.html')
         
        })
        .catch(function(error){
            console.log(error.message)
            errorBox.style.display = 'block';
            errorBox.innerHTML = '<center>' + error.message + '</center>'
            setTimeout(function(){
                errorBox.style.display = 'none';
            },3000)
        })

}
let current;
auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      let currentUser = auth.currentUser;
      current = currentUser.uid
     console.log(currentUser.email)
    } else {
      // User is signed out
      // ...
    }
  });

function logOut(){
    auth.signOut()
        .then(function(logOutDetails){
            window.location.replace('../index.html')
        })
        .catch(function(logOutError){
            console.log(logOutError.message)
        })
}

//////////////////////////////////


function saveDataToFireStore(dataElement){
    
    let currentUser = auth.currentUser;
    db.collection('users').doc(currentUser.uid).set(dataElement)
        .then(function(saveData){
            console.log(saveData,'SAVED')
        })
        .catch(function(error){
            console.log(error.message)
        })
}
var docUID ;


function searchBar(){
    db.collection('users').get() 
        .then(function(fetchData){
            fetchData.forEach(function(RetriveData){
                if(searchUser.value === RetriveData.data().username){
                        searchUser.value =""
                        separeteStructure(RetriveData.data());  
                        docUID = RetriveData.data().UID
                }else{
                    errorBox.innerHTML = '<center>User Not Found</center>'
                    errorBox.style.display = 'block';
                    setTimeout(function(){
                        errorBox.innerHTML = '';
                        errorBox.style.display = 'none';
                    },3000)
                }
                    
         
            })
        })
}

let divChat = document.getElementById('divChat');
let divChatInp = document.getElementById('divChatInp');
let sendMessageBtn = document.getElementById('sendMessageBtn');
let divSearchUser = document.getElementById("divSearchUser")
let divAllUser =document.getElementById('divAllUser')
let con1 = document.getElementsByClassName('con1')
let divChatSend = document.getElementById('divChatSend');

function separeteStructure(dataElement){
    let currentUser = auth.currentUser;
    if(currentUser.uid === dataElement.UID){
        // con1.removeChild(con1.lastChild)
    }else{
    var createUl = document.createElement('ul');
    var createLi = document.createElement('li');
    var createBtnli = document.createElement('button');
    var createBtnTextNode = document.createTextNode(dataElement.username);
    createLi.id = docUID;
    createLi.setAttribute('onclick','displaying(this)')
    createBtnli.className = 'btn';
    ///////appendingChilds///////
    createBtnli.appendChild(createBtnTextNode)
    createLi.appendChild(createBtnli)
    createUl.appendChild(createLi);
    divAllUser.appendChild(createUl)
//     setTimeout(function(){
//    container.removeChild(container.firstChild)
//     },3000)
    }
   
    ///////appendingChilds///////
    // divChatInp.className = 'chatInp';
}

////////////////Functions///////////////////
divChat.style.display = 'none';
divChatSend.style.display = 'none'



function displaying(){
    let bool = true;
    divChat.className = 'divChat';
    
    // divChatInp.style.display = 'block'
    // sendMessageBtn.style.display = 'block'
    if(bool){
        divChat.style.display = 'block';
        divChatSend.style.display = 'block'
        bool = false
        searchUser.value = '';
       if(divChat.firstChild){
        divChat.children[0].remove()
        divAllUser.childNodes[1].remove()
         }
    }
   ///////////////
   chattingUserData() 
   
    //////////////
}
////////////////////////////////////

function chattingUserData(){
    let currentUser = auth.currentUser;
    /////1/////
    let createul = document.createElement('ul');
    divChat.appendChild(createul);
    createul.className = 'chatpara1'

    fetchRealTimeMessage(createul);
}
///////////////////////////////////
function saveMessageToFirestore(){  
    let currentUser = auth.currentUser;
    ///////////////////////////


    db.collection('messages').add({
        messages : divChatInp.value,
        sendingUID : docUID,
        recieveUID : currentUser.uid

    })
        .then(function(sendMessage){
            // console.log(sendMessage,'SAVED')
            divChatInp.value  = '';
            db.collection('notifications').doc(currentUser.uid).set({
                notificate : docUID,
                recieveUID : currentUser.uid
            })
        })
        .catch(function(error){
            console.log(error)
        })
        /////////////////////////////////////////////

}
///////////////////////
let dataFetchRealTimes = [];
function fetchRealTimeMessage(createul){
    let currentUser = auth.currentUser;
   
    db.collection("messages").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                var data = change.doc.data();
                // console.log(dataFetchRealTimes[0])
                // fetchRealTime(data,createP2)
                fetchRealTimeQueries(createul,currentUser,data)
            }
            
        });

    });
    

}
//////////////////////////////////////////////////

function fetchRealTimeQueries(createul,currentUser,data){
    if(data.sendingUID === currentUser.uid && docUID === data.recieveUID){


        db.collection('users').doc(data.recieveUID).get()
        .then(function(member){
            
                // console.log(member.data().username)
                let createLi = document.createElement('li');
                let textNodeLi = document.createTextNode( member.data().username + " : " + data.messages)
                dataFetchRealTimes.push(data.messages);
                createLi.appendChild(textNodeLi)
        createul.appendChild(createLi)
        })
     

       
        /////////////////////////////////////////////}
        ////////////////////////////////////////////
    }else if(data.recieveUID === currentUser.uid && data.sendingUID === docUID){

        db.collection('users').doc(data.recieveUID).get()
            .then(function(member){
                
                    // console.log(member)
                    let createLi = document.createElement('li');
                    let textNodeLi = document.createTextNode( member.data().username + " : " + data.messages)
                    dataFetchRealTimes.push(data.messages);
                    createLi.appendChild(textNodeLi)
            createul.appendChild(createLi)
            })
     


      
         /////////////////////////////////////////////
        ////////////////////////////////////////////
    }
 
}

////////////////////////////////////////////////////////
// function fetchRealTime(data,createP2){
//     let currentUser = auth.currentUser;
//     db.collection('keys').get()
//     .then(function(keysDataScrap){
//         keysDataScrap.forEach(function(keysData){
//             // console.log(data.sendingUID === currentUser.uid && docUID === data.recieveUID)
           
            
//         })
//     })
// }


// if(divChat.firstChild){
//     divAllUser.childNodes[1].remove()
//     // console.log(divAllUser.childNodes[1])
// }

accessNotifications()
let notificationsContent = document.getElementById('notificationsContent');
let collapsible = document.getElementById('collapsible');

function accessNotifications(){



    // db.collection("users").onSnapshot((snapshot) => {
    //     snapshot.docChanges().forEach((change) => {
    //         if (change.type === "added") {
    //             let notiRealTime = change.doc.data();
    //             if(notificateData2.data().notificate === current){

    //                 if(notificateData2.id === RetriveData.id){
    //                         setTimeout(function(){
    //                            collapsible.style.backgroundColor = '#eee';
    //                                db.collection("notifications").doc(RetriveData.data().UID).delete()
    //                        },5000)
                                             
    //                          collapsible.style.backgroundColor = 'greenyellow';
    //                          notificationsContent.innerHTML = notificationsContent.innerHTML + RetriveData.data().username + ' Message You \n' ;

    //                         }
    //                     }
    //         }
    //     });
    // });









    db.collection('users').get() 
    .then(function(fetchData){
        fetchData.forEach(function(RetriveData){
            
                ////////////////
                db.collection("notifications").onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((notificateData2) => {
                        if (notificateData2.type === "added") {
                            if(notificateData2.doc.data().notificate === current){
                                if(notificateData2.doc.id === RetriveData.id){
                                    console.log('Agaya me')
                                    setTimeout(function(){
                                        collapsible.style.backgroundColor = '#eee';
                                        db.collection("notifications").doc(RetriveData.data().UID).delete()
                                },5000)
                             
                                collapsible.style.backgroundColor = 'greenyellow';
                                console.log('timeOut')
                            notificationsContent.innerHTML = notificationsContent.innerHTML + RetriveData.data().username + ' Message You \n' ;
                                }
                            }








                        }
                       
                        
                    });
                });





    })
    ////////////////
     
    ////////////
        
})
}







var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
