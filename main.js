

/*
User Stories
User clicks submit button -> sends an API GET request with all the information from the form.
The callback function will either return an error specifying why data wasn't retreieved, or the correct value returned.
*/

// Showing JQuery version of code, may just use vanilla javascript
$(main())

function main() {
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
            callVehicleValuationAPI(data, displayOutput, failedAjax);  // Or we can let callVehicleValuationAPI handle the callback function, run from there.
        });
    }

    function clearOutput() {
        $("#api-output").html(``);
    }

    function callVehicleValuationAPI(data, callback, failcall) {
        // Makes a call to the Vehicle-Valuation-API to get a cost analysis given the criteria.
        // The API will validate the make/model first. Returns the cost if validated.
        const settings = {
            url: `https://cryptic-plains-11682.herokuapp.com/value` +
                `?make=${data.make}&model=${data.model}&age=${data.age}&collisions=${data.collisions}&owners=${data.owners}&mileage=${data.mileage}`,
            path: `GET`,
            dataType: `json`,
            success: callback,
            failure: failcall
        }

        $.ajax(settings);
    }

    function displayOutput(output) {
        // On a successful return from the vehicle valuation API. We either receive:
        // 1. an error notification {error : {field: "description of fault", field: "description of fault"}}
        // 2. a calculated value { value : 1000 }
        if (output.error) {
            $("#api-output").html(`Error!<br>`);
            Object.entries(output.error).forEach(entry => {
                $("#api-output").append(`${entry[0]}: ${entry[1]}`);
            });
        } else if (output.value) {
            $("#api-output").html(`Value : ${output.value}`);
        }
    }

    function failedAjax() {
        // If an Ajax call fails
        $("#api-output").html(`Error!<br>Server : Our Vehicle Valuation API is not activated at this time.`);
    }
}