/*

# Homework

Using the data from the https://restcountries.eu/#api-endpoints, we would like from you to create 2 individual homeworks.

*/

//FIRST, A CLASS FOR THE HTML
let page = {
    blocValue: document.getElementById('blocValue'),
    blocSubmit: document.getElementById('blocSubmit'),
    blocDiv: document.getElementById('blocDiv'),

    ISOValue: document.getElementById('ISOValue'),
    ISOSubmit: document.getElementById('ISOSubmit'),
    ISODiv: document.getElementById('ISODiv'),

    clickBloc: this.blocSubmit.addEventListener(`click`, () => {
        if (this.blocValue.value.length > 0) {
            page.blocDiv.innerHTML = ``;
            apiData.bloc = blocValue.value;
            //apiData.getDataBloc();
            apiData.getDataBlocWithAjax();
            this.blocValue.value = ``;
        }
    }),    

    clickISO: this.ISOSubmit.addEventListener(`click`, () => {
        if (this.ISOValue.value.length > 0) {
            page.ISODiv.innerHTML = ``;
            apiData.iso = ISOValue.value;
            apiData.getDataISO();
            this.ISOValue.value = ``;
        }
    }),
}


//THEN A CLASS FOR FETCHING THE DATA
let apiData = {

    //DEFAULT VALUES
    bloc: `eu`,
    iso: `mkd`,
    apiUrl: `https://restcountries.eu/rest/v2/`,

    //FETCH FOR BLOC WITH ASYNC/AWAIT SYNTAX
    getDataBloc: async function getBlocCode() {
        let data = await fetch(`${this.apiUrl}regionalbloc/${this.bloc}`);
        let bloc = await data.json();

        if (bloc.length > 0) {
            bloc.map(country =>
                //THE FIRST TASK PARAMETERS
                country.altSpellings.length >= 1 && country.altSpellings.length <= 4
                    ? page.blocDiv.innerHTML += `${country.altSpellings.length} alternative spelling names for <b>${country.name}</b>: ${country.altSpellings}<br>`
                    : null
            )
        }
    },

    //SAME AS ABOVE ONLY WITH AJAX SYNTAX
    getDataBlocWithAjax: function() {
        $.ajax({
            url: `${this.apiUrl}regionalbloc/${this.bloc}`,
            success: function(bloc) {                     
                if (bloc.length > 0) {
                    bloc.map(country =>
                        //THE FIRST TASK PARAMETERS with ajax
                        country.altSpellings.length >= 1 && country.altSpellings.length <= 4
                            ? page.blocDiv.innerHTML += `${country.altSpellings.length} alternative spelling names for <b>${country.name}</b>: ${country.altSpellings}<br>`
                            : null
                    )
                }
            },
            error: function(error) {
                console.warn("The request has failed")
                console.error(error.responseText)
            }
        })
    },

    //FETCH FOR ISO
    getDataISO: async function getISOCode() {
        let data = await fetch(`${this.apiUrl}alpha/${this.iso}`);
        let iso = await data.json();
        getSameCurrencyCountries();
        
        //THE SECOND TASK PARAMETERS
        async function getSameCurrencyCountries(){      
            let data = await fetch(`${apiData.apiUrl}currency/${iso.currencies[0].code}`)
            let countries = await data.json();
            countries.forEach(country =>{
                for (let i = 0; i < country.currencies.length; i++){
                    page.ISODiv.innerHTML += `${country.name}: ${country.currencies[i].name}.<br>`
                }
            })
        }
    }
}


apiData.getDataBloc();
apiData.getDataISO();

