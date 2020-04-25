var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id,
            this.description = description
        this.value = value
    };

    var Income = function (id, description, value) {
        this.id = id,
            this.description = description
        this.value = value
    };



    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    };

    return {

        testing: function () {
            console.log(data.allItems)
        },


        additem: function (type, des, val) {
            var newItem, ID;

            //new id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //create new item if its exp or inc
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            //push the data into data structure
            data.allItems[type].push(newItem)


            //return new item
            return newItem
        }

    };


})();


var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    }


    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHTML;
            //create hTML strings with palceholder
            if (type === 'inc') {
                element = DOMStrings.incomeContainer
                html = '<div class="item clearfix" id="income-%ID%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //replace the placeholder text with some actual data
            newHTML = html.replace('%id', obj.id)
            newHTML = newHTML.replace('%description%', obj.description)
            newHTML = newHTML.replace('%value%', obj.value)
            //insert the html into the dom

            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)

        },
        
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);  
         
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function (current, index, array){
                current.value = "";
            })
            
            fieldsArr[0].focus();
        },

        getDomStrings: function () {
            return DOMStrings;
        }
    }
})();


//GLOBAL APP CONTROLLER
var controller = (function (bdgtCTRL, UICtrl) {

    var setUpEventListeners = function () {
        var DOM = UICtrl.getDomStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)


        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 1 || event.which == 13)
                ctrlAddItem();


        })
    }

    var updateBudget = function(){
        //calculate the budget

        // return the budget
        
        //display the budget on the ui
    }
    var ctrlAddItem = function () {
        console.log('it works')

        var input, newItem;
        //1. get the field input data
        var input = UIController.getInput();
        
          if (input.description !=="" && !isNaN(input.value) && input.value>0){
        //2. add item to budget controller
        var newItem = bdgtCTRL.additem(input.type, input.description, input.value)
        //3. add new titem to UI
        UICtrl.addListItem(newItem, input.type)
        
        //clear the fields
        UICtrl.clearFields();
        //4. calc budget
        
        updateBudget()
          }
        // on git read-input
        //5. display budget on the UI
    };

    return {
        init: function () {
            console.log('Application running')
            setUpEventListeners();
           
        }
    }


})(budgetController, UIController);


controller.init();
