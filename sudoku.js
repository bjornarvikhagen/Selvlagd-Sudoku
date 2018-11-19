Array.prototype.shuffle = function() {
  var input = this;
  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
    //Denne funksjonen går igjennom hver "item", og bytter den ut med en tilfeldig "item"
  }
  return input;
};
var h2 = document.getElementsByTagName("h2")[0],
  start = document.getElementById("start"),
  stop = document.getElementById("stop"),
  clear = document.getElementById("clear"),
  seconds = 0,
  minutes = 0,
  hours = 0,
  t;

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  h2.textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);

  timer();
}
function timer() {
  t = setTimeout(add, 1000);
}
timer();

/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
  clearTimeout(t);
};
clear.onclick = function() {
  h2.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
};
/* Clear button */
trykk1.onclick = function() {
  h2.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
  lett();
};
trykk2.onclick = function() {
  h2.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
  middels();
};
trykk3.onclick = function() {
  h2.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
  vanskelig();
};

function hint() {
  var tekst = [];
  tekst[0] =
    "Er det noen rader, kolonner eller delkvadrat med bare én ledig rute?";
  tekst[1] = "Er det mer enn ett likt tall i raden, kolonnen eller delkvadrat?";
  tekst[2] = "Se etter eneste mulige plassering for tallet.";
  tekst[3] =
    "Dersom et tall i en blokk kan plasseres i en bestemt rad eller kolonne, men ikke på sin endelige plassering, kan denne kunnskapen brukes til å eliminere plasseringen av tallet i de andre blokkene som raden eller kolonnen er en del av.";
  var i = Math.floor(4 * Math.random());
  alert(tekst[i]);
}
var Sudoku = (function() {
  var _rows, _cols, _grid;
  validation = true;
  var valg = function() {
    lett();
    middels();
    vanskelig();
  };
  lett = function() {
    genererBrett();
    slettCeller(20); //Tømmer N celler, så ikke brettet kommer ferdig utfylt
    renderData(_rows);
    return this;
  };
  middels = function() {
    genererBrett();
    slettCeller(50); //Tømmer N celler, så ikke brettet kommer ferdig utfylt
    renderData(_rows);
    return this;
  };
  vanskelig = function() {
    genererBrett();
    slettCeller(80); //Tømmer N celler, så ikke brettet kommer ferdig utfylt
    renderData(_rows);
    return this;
  };
  // Setter igang funksjonen som fyller inn brettet med data
  init = function() {
    genererBrett();
    slettCeller(80); //Tømmer N celler, så ikke brettet kommer ferdig utfylt
    renderData(_rows);
    return this;
  };
  slettCeller = function(n) {
    for (var i = 0; i < n; i++) {
      randomrow = Math.floor(Math.random() * 9); //Velger en tilfeldig rad å slette celler i mellom 1 og 8
      randomcol = Math.floor(Math.random() * 9); //Velger en tilfeldig kolonne å slette celler i mellom 1 og 8
      if (_rows[randomrow][randomcol] !== null) {
        _rows[randomrow][randomcol] = null;
        _cols[randomcol][randomrow] = null;
      }
    }
  };
  //Fyller brettet med data (tall)
  renderData = function(data) {
    var cell;
    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        //Går igjennom brettet, celle for celle, rad for rad, og kolonne for kolonne
        //Begynner med rad 0, kolonne 1
        //rad 0, kolonne 2
        //...
        //rad 0, kolonne 8
        //rad 1, kolonne 1
        //document er variabelen som velger det åpne html-dokumentet
        //querySelector er en funksjon som velger et DOM-element ved hjelp av CSS-selectors:
        //i dette tilfellet #sudoku
        //tr tar hvert element med taggen <tr>
        //nth-child tar det n-te elementet
        //bruker row+1 fordi nth-child ikke virker på samme måte som arrays: den begynner å telle fra 1, ikke 0
        //td gjør det samme som tr men velger <td>
        cell = document.querySelector(
          "#sudoku tr:nth-child(" +
            (row + 1) +
            ") td:nth-child(" +
            (col + 1) +
            ")"
        ); //Ta den relevante cellen
        //Som tidligere; siden "input = " ikke er etterfulgt av noen slags symbol henter koden elementet med taggen <input>
        input = cell.querySelector("input");
        input.attributes["row"] = row; // Setter html-attributten "rad" til nåverende rad-nummer (f.eks rad 2, kolonne 3)
        input.attributes["col"] = col; // Samme som rad, men for kolonnene
        //Med denne typen  metote så oppdateres ikke html-koden, men verdien blir fortsatt lagret i elementets egenskaper
        //med tanke på formålet til koden, så bryr vi oss ikke om endringen vises i html eller ikke
        // Regner ut grid-indeksen (indeksen som viser 3x3-brettet, begynner øverst til venstre med indeks 0, før den går videre fra venstre til høyre og topp til bunn)
        gridRow = Math.floor(row / 3);
        gridCol = Math.floor(col / 3);
        gridIndex = gridRow * 3 + gridCol;
        input.attributes["grid"] = gridIndex;
        input.value = data[row][col]; //Velg inputen og sett en verdi
      }
    }
    document.querySelectorAll("#sudoku td input").forEach(function(inp) {
      //Velger <input> inne i <td>-taggen fra et dom-element med id-en "sudoku";
      //denne funksjonen vil kjøre for hvert element som hentes
      inp.addEventListener("change", function(e) {
        //for hvert element legg til en event, når innholdet endres
        //kjøres function for å validere nåverende rad, kolonne og brettet for å sjekke at det ikke finnes duplikat
        rownumber = e.target.attributes["row"];
        colnumber = e.target.attributes["col"];
        gridnumber = e.target.attributes["grid"];
        number = parseInt(e.target.value);
        //Når du henter verdien til input-en, er det ikke et enkelt tall, men en "string", og vi må derfor bryte ned stringen til individuelle integers
        _rows[rownumber][colnumber] = number; //Oppdater cellens verdi
        _cols[colnumber][rownumber] = number;
        cellrow = rownumber % 3;
        cellcol = colnumber % 3;
        cellindex = cellrow * 3 + cellcol;
        _grid[gridnumber][cellindex] = number;
        if (validation) {
          //if-validering aktiveres hver gang noe i sudokuen endres
          //de kan ha 3 statuser
          //valid (true)
          //invalid (false)
          //neutral (null)
          var validrow = _validate([_rows[rownumber]]);
          var validcol = _validate([_cols[colnumber]]);
          var validgrid = _validate([_grid[gridnumber]]);
          setRowStatus(rownumber, validrow); //Settes raden som nøytral, valid eller invalid
          setColStatus(colnumber, validcol);
          if (validrow && validcol && validgrid) {
            //hvis alt er gyldig (valid):
            checkBoard(); //sjekk om brettet er ferdig utfylt og valider på nytt for å se på nytt om spillet er vunnet
          }
        } else {
          //hvis ikke raden, kolonnen og brettet er valid, sjekker den kun brettet
          checkBoard();
        }
      });
    });
  };
  setRowStatus = function(rownumber, status) {
    var tstatus; //convert the null,true & false variable to actual text that can be used with css classes
    if (status === null) {
      tstatus = "";
    } else if (status) {
      tstatus = "is-valid";
    } else {
      tstatus = "is-invalid";
    }
    //Oppdater klassene for å vise statusen
    document
      .querySelectorAll("#sudoku tr:nth-child(" + (rownumber + 1) + ") td")
      .forEach(function(cell) {
        cell.className = tstatus;
      });
  };
  setColStatus = function(colnumber, status) {
    var tstatus; //Gjør det samme som setRowStatus men for kolonnene
    if (status === null) {
      tstatus = "";
    } else if (status) {
      tstatus = "is-valid";
    } else {
      tstatus = "is-invalid";
    }
    document
      .querySelectorAll("#sudoku tr td:nth-child(" + (colnumber + 1) + ")")
      .forEach(function(cell) {
        cell.className = tstatus;
      });
  };

  function seier() {
    var x = document.getElementById("seiersBilde");
    var lyd = document.getElementById("seiersLyd");
    if (x.style.display === "none") {
      x.style.display = "block";
      seiersLyd.play();
      bgAudio.pause();
    } else {
      x.style.display = "none";
    }
  }

  checkBoard = function() {
    if (this.isFull()) {
      //Sjekkes om brettet er fult
      if (isValid()) {
        //Sjekker om dataen i det utfylte brettet er rett
        seier();
        document.getElementById("seiersTekst").innerHTML = "Du klarte det!";
        clearTimeout(t);
      }
    }
  };
  isFull = function() {
    for (var row = 0; row < 9; row++) {
      for (
        var col = 0;
        col < 9;
        col++ //Går igjennom alle cellene rad for rad
      ) {
        if (_rows[row][col] === null) {
          //om en av radene eller kolonnene er "null"
          return false; //return svar på funksjonen "isFull" som "false" for å vise at brettet ikke er ferdig utfylt
        }
      }
    }
    return true; //Om funksjonen når hit, betyr det at brettet er ferdig utfylt og at ingen av cellene har verdien "null"
  };
  // return true om sudokuen er gyldig
  isValid = function() {
    return _validate(_rows) && _validate(_cols) && _validate(_grid); //Valider hver rad, kolonne og brettet
  };
  // validate rows
  _validate = function(data) {
    for (var row = 0; row < data.length; row++) {
      var tempData = [].concat(data[row]);
      tempData.sort();
      // Dette er en algoritme for å finne duplikat i i brettet.
      // Når du sorterer arrayen får du tallene i stigende rekkefølge
      // For å fullføre en 3x3 i sudoku må du ha alle tallene mellom 1 og 9
      // Hvis du ser på en rad i sudoku kan dataen f.eks se slik ut
      //  8,1,4,7,5,6,2,3,9
      // Når du sorterer tallene, vil de se slik ut
      // 1,2,3,4,5,6,7,8,9
      // Hvis arrayen har duplikater, vil den se sånn ut (om vi fjerner tallet 8 og skriver inn 3 istedet)
      // Denne funksjonen har vi så isValid() ikke skal tro at brettet er gyldig hver gang brettet er fult.
      // Det må være fylt med 1-9 for å være gyldig.
      for (var col = 0; col < tempData.length; col++) {
        if (col == tempData.length - 1 || tempData[col] === null) {
          //If it's the last check or the column is null we can skip it
          // Når du når null-verdien kan du være sikker på at spillet er ferdig fordi
          // javascript sin sort-funksjon tar null-ene etter vanlige tall
          // hvis du når null-verdien kan du være sikker på at brettet ikke har mer data fordi
          // javascript alltid tar null til slutt. En array med 4 nulls vil f.eks se slik ut:
          //[1,2,3,4,5,null,null,null,null]
          return true;
        }
        var value = tempData[col],
          next_value = tempData[col + 1];
        // sjekker om verdien er å finne og er et gyldig tall
        if (!(value && value > 0 && value < 10)) {
          return false;
        }
        // sjekker om tallene er unike
        if (col !== 8 && value === next_value) {
          return false;
        }
      }
      return false;
    }
    return true;
  };
  // Denne funksjonen fyller brettet med tilfeldige array-objekter
  genererBrett = function() {
    r = []; // row
    c = []; // column
    g = []; // grid
    validNumbers = [];
    for (var i = 0; i < 9; i++) {
      // Tilfeldig tall mellom 1 og 9
      r.push([]); // til rad
      c.push([]); // til kolonne
      g.push([]); // til grid
      validNumbers.push([]);
    }
    for (
      var currentrow = 0;
      currentrow < 9;
      currentrow++ // velger en etter en rad
    ) {
      for (
        var currentcol = 0;
        currentcol < 9;
        currentcol++ // velger en etter en kolonne
      ) {
        // Hvis det er første gangen den velger raden eller kolonnen
        if (validNumbers[currentrow][currentcol] === undefined) {
          // Avklarer at 1-9 er gyldige tall og stokker om på tallene
          validNumbers[currentrow][currentcol] = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
          ].shuffle();
          // Vi stokker om på tallene med shuffle-funksjonen fordi ellers hadde sudoku-brettene
          // fått veldig synlige mønstre
          // de ville hatt mønstre som 1-2-3-4-5-6-7-8-9, 4-5-6-7-8-9-1-2-3, 7-8-9-1-2-3-4-5-6
          // delt på tre grupper med stigende tall
        }
        // Hvis denne cellen er tom, vil den leses om og om igjen
        while (validNumbers[currentrow][currentcol].length > 0) {
          // setter found-variabelen til false
          found = false;
          // Shift-funksjonen sletter det første elementet i en array og returner det
          var newTry = validNumbers[currentrow][currentcol].shift();
          r[currentrow][currentcol] = newTry;
          c[currentcol][currentrow] = newTry;
          gridRow = Math.floor(currentrow / 3);
          gridCol = Math.floor(currentcol / 3);
          gridIndex = gridRow * 3 + gridCol;
          // Regner ut hver celles identifikator relativ til hvilken grid den er i (1-9)
          boxRow = currentrow % 3;
          boxCol = currentcol % 3;
          boxIndex = boxRow * 3 + boxCol;
          g[gridIndex][boxIndex] = newTry;
          if (
            _validate([r[currentrow]]) &&
            _validate([c[currentcol]]) &&
            _validate([g[gridIndex]])
          ) {
            // valider raden, kolonnen og grid-et til cellen
            found = true; // found = true sier at verdien vi validerte er gyldig
            break; // stopper while-loopen
          }
        }
        if (!found) {
          // hvis du loopet igjennom alle de mulige tallene men ikke fant dem
          // så må du gå baklengs, en og en celle og gå igjennom alle mulige verdier for den gitte cellen
          // siden det er en for-loop, må du gå tilbake x2 siden 1 av gangene vil bli oversett av for-looopen
          //But before going back we have to reset the current validNumbers for this cell
          // før vi går tilbake i for-loopen må vi resette de tilgjengelige gyldige tallene for cellen
          validNumbers[currentrow][currentcol] = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
          ].shuffle();
          // og også resette verdien av cellen
          // og også resette verdien av cellen
          r[currentrow][currentcol] = null;
          c[currentcol][currentrow] = null;
          g[gridIndex][boxIndex] = null;
          if (currentcol > 1) {
            // som sagt tidligere, trekker vi fra 2
            currentcol -= 2;
            // Om vi er nær begynnelsen av raden, vil vi hente differansen og prøve igjen, men
            // denne gangen starte på slutten av raden
          } else {
            currentcol = 8 + (currentcol - 2); // Om vi er på kolonne 1, blir det 1-2 = -1, så vi gjør
            // 8+(-1) = 7. For-loopen legger til 1 for å prøve å gå fremover og kolonnen
            // blir da 8 fra den første (0) til den siste (8)
            currentrow--; // Vi må også gå 1 rad oppover
          }
        }
      }
    }
    _rows = r;
    _cols = c;
    _grid = g;
  };
  return {
    init: init,
    isValid: isValid,
    _validate: _validate
  };
})();
var game = Sudoku.init();
