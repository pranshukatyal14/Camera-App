let request = indexedDB.open("camera",2);

let db;

request.onsuccess=function(e){
    db=request.result;
    let note={
        nId="hihbjbbjbjjb",
        txt="hello i'm pranshu "
    }

    let tx=db.transaction("gallery","readwrite");
    let store=tx.objectStore("gallery");
    store.add(note);
    
     
}

request.onupgradeneeded=function(e){
     db=request.result;
    db.createObjectStore("gallery",{keyPath:"mId"});
}

