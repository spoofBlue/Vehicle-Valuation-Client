

/*
User Stories
User clicks submit button -> sends an API GET request with all the information from the form.
The callback function will either return an error specifying why data wasn't retreieved, or the correct value returned.
*/

// Showing JQuery version of code, may just use vanilla javascript
$(main())

function main() {
    const APIURL = `https://cryptic-plains-11682.herokuapp.com/value`;   // Current online API used.

    console.log(`Hello from main.js`);
    formSubmission();

    function formSubmission() {
        clearOutput();
        $("form").on("click", "#car-value-submit-button", function () {
            let data = {
                make: $("#car-make").val(),
                model: $("#car-model").val(),
                marketValue: $("#car-marketvalue").val(),
                age: $("#car-age").val(),
                owners: $("#car-owners").val(),
                mileage: $("#car-mileage").val(),
                collisions: $("#car-collisions").val()
            }
            callVehicleValuationAPI(data, displayValue, failedAjax);
        });
    }

    function clearOutput() {
        $("#api-output").html(``);
    }

    function callVehicleValuationAPI(data, callback, failcall) {
        // Makes a call to the Vehicle-Valuation-API to get a cost analysis given the criteria. given data object.
        // // The API will validate the make/model first. Returns the cost if validated.
        // Runs callback function on success, failcall function in an error.
        const apiLink = `http://localhost:8080/value`;   //APIURL;
        const queryString =
            `?make=${data.make}&model=${data.model}&marketvalue=${data.marketValue}&age=${data.age}&collisions=${data.collisions}&owners=${data.owners}&mileage=${data.mileage}`;
        const settings = {
            url: apiLink + queryString,
            path: `GET`,
            dataType: `json`,
            success: callback,
            error: failcall
        }

        $.ajax(settings);
    }

    function displayValue(output) {
        // On a successful return from the vehicle valuation API. We receive:
        // A calculated value { value : 1000 }
        console.log(`in displayOutput. output=`, output);
        if (output.value) {
            $("#api-output").html(`Value : ${output.value}`);
        }
    }

    function failedAjax(output) {
        // If there is an invalidation error. We receive:
        // An error notification {error : {field: "description of fault", field: "description of fault"}}
        // Otherwise (an Ajax call fails), display a generic response.
        console.log(`in failedAjax. output=`, output);
        if (output.responseJSON.error) {
            $("#api-output").html(`Error!<br>`);
            Object.entries(output.responseJSON.error).forEach(entry => {
                console.log(entry);
                $("#api-output").append(`${entry[0]}: ${entry[1]}<br>`);
            });
        } else {
            $("#api-output").html(`Error!<br>Server : Our Vehicle Valuation API is not activated at this time.`);
        }
    }
}