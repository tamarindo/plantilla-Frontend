(function(){

  var indexdb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
      dataBase = null;

  function startIndexdb(){
    var active,
        object;

    dataBase = indexdb.open('obj',1),

    dataBase.onupgradeneeded = function (e) {
      active = dataBase.result;
      object = active.createObjectStore("people", { keyPath : 'id', autoIncrement : true });
      object.createIndex('by_name', 'name', { unique : false });
      object.createIndex('by_dni', 'dni', { unique : true });
    };

    return dataBase
  }

   function add() {
      
      var active = dataBase.result;
      var data = active.transaction(["people"], "readwrite");
      var object = data.objectStore("people");
      
      var request = object.put({
          dni : document.querySelector("#dni").value,
          name : document.querySelector("#name").value.toLowerCase(),
          username : document.querySelector("#username").value
      });
      
      request.onerror = function (e) {
          alert(request.error.name + '\n\n' + request.error.message);
      };

      data.oncomplete = function (e) {
          document.querySelector('#dni').value = '';
          document.querySelector('#name').value = '';
          document.querySelector('#username').value = '';
          alert('Object successfully added');
          loadAll();
      };
    }
              
          
    function load() {
        var id = document.querySelector("#dni2").value;
        var active = dataBase.result;
        var data = active.transaction(["people"], "readonly");
        var object = data.objectStore("people");
        var index = object.index("by_dni");
        
        var request = index.get(id);
        
        request.onsuccess = function () {
            
            var result = request.result;
            
            if (result !== undefined) {
                alert("ID: " + result.id + "\n\
                DNI: " + result.dni + "\n\
                Name: " + result.name + "\n\
                Username: " + result.username);
            }
        document.querySelector("#dni2").value= "";
        };
                
      }
            
      function loadAll() {
          
          var active = dataBase.result;
          var data = active.transaction(["people"], "readonly");
          var object = data.objectStore("people");
          
          var elements = [];
          
          object.openCursor().onsuccess = function (e) {
              
              var result = e.target.result;
              
              if (result === null) {
                  return;
              }
              
              elements.push(result.value);
              result.continue();
              
          };
          
          data.oncomplete = function() {
              
              var outerHTML = '';
              
              for (var key in elements) {
                  
                  outerHTML += '\n\
                  <tr>\n\
                      <td>' + elements[key].dni + '</td>\n\
                      <td>' + elements[key].name + '</td>\n\
                      <td>'+ elements[key].username + '</td>\n\
                  </tr>';                        
              }
              
              elements = [];
              document.querySelector("#elementsList").innerHTML = outerHTML;
          };
          
      }
            

    var result = startIndexdb();

    result.onsuccess = function (e) {
        console.log('Base de datos cargada correctamente');
         loadAll();
    };

    result.onerror = function (e)  {
        console.log('Error cargando la base de datos');
    };

   




document.querySelector("#idbBtnGuardar").addEventListener('click', add);
document.querySelector("#idbBtnBuscar").addEventListener('click', load);

}());