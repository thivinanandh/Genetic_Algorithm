
/// The global Variables

let Sentence
let Mutation_Rate
let maxPopulation



let populationObject;

let SimulationStarted = false;



var slider = document.getElementById("populationSlider");
var output = document.getElementById("Population");
var output_1 = document.getElementById("Population_1");

//Mutation Rate
var mutSlider = document.getElementById("mutationSlider");
var mut = document.getElementById("Mutation");
var mut_1 = document.getElementById("Mutation_1");

slider.oninput = function() {
    output.innerHTML = this.value;
    output_1.value = this.value;
  }

  // Update the current slider value (each time you drag the slider handle)
  mutSlider.oninput = function() {
    mut.innerHTML = this.value;
    mut_1.value = this.value;
  }

function setup()
{

    if(! SimulationStarted)
        return;
    // Sentence = "Thivin The Great..!";
    // Mutation_Rate = 0.02;
    // maxPopulation = 500;

    console.log("COMESS HERE")

    // Print Actual Phrase 
    var actualPhraseElement = document.getElementById("titlePhrase");
    actualPhraseElement.innerHTML = Sentence;

    console.log(Sentence)
    console.log(Mutation_Rate)
    console.log(maxPopulation)
    populationObject  = new population(Sentence,Mutation_Rate,maxPopulation);
   

    

    var rightTable = document.getElementById("generations");
    rightTable.innerHTML = populationObject.getDisplayPhrase();

    
}

function StartSimulation()
{
    Sentence = document.getElementById("TextVal_1").value
    maxPopulation = document.getElementById("populationSlider").value
    Mutation_Rate = document.getElementById("Mutation_1").value / 100;
    SimulationStarted = true
    setup()
}


function draw()
{
    if(! SimulationStarted)
        return;
    populationObject.selection();
    populationObject.computeFitness();

    updateInfo();

    if(populationObject.isMaxFittnessReached())
    {
        noLoop();
    }



}


function updateInfo()
{
    document.getElementById("generation").innerHTML = populationObject.generationCount;
    let matched = populationObject.population[populationObject.bestGeneindex].matchedChar;
    let percentage  = (matched/Sentence.length) * 100;
    document.getElementById("Fitness").innerHTML    = percentage.toFixed(2) + " %";
    document.getElementById("Population").innerHTML = maxPopulation;
    
    bestprediction = populationObject.getBestGenome()
    var PredictedPhraseElement = document.getElementById("predictedPhrase");
    PredictedPhraseElement.innerHTML = bestprediction;

    var rightTable = document.getElementById("generations");
    rightTable.innerHTML = populationObject.getDisplayPhrase();
}