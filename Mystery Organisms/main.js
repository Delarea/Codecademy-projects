// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const findPercentage = (genes, dnaLength) => {
  return Math.round(((genes / dnaLength) * 100));
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      let randomIndex = [Math.floor(Math.random() * 15)];
      let oldGene = this.dna[randomIndex];
      let newGene = '';
          do{newGene = returnRandBase();
          }while (oldGene == newGene);
          this.dna.splice(randomIndex, 1, newGene);
    },
    compareDna(otherDna) {
      let shareDna = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] == otherDna.dna[i]) {
          shareDna++
        }
      }
      let percentDna = findPercentage(shareDna, this.dna.length);
      /*console.log(`Specimen #${this.specimenNum} and Specimen #${otherDna.specimenNum} 
      share ${shareDna} genes and have ${percentDna}% DNA in common.`);*/
      return percentDna; 
    },
    willLikelySurvive() {
      let cOrGGene = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] == 'C') {
          cOrGGene++
        } else if(this.dna[i] == 'G') {
          cOrGGene++
        }
      }
      let survivalGenes = findPercentage(cOrGGene, this.dna.length);
      if(survivalGenes >= 60) {
        this.survivalDna = survivalGenes + '%';
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      let twinStrand = [];
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] == 'A') {
          twinStrand.push('T');
        } else if (this.dna[i] == 'T') {
          twinStrand.push('A');
        } else if (this.dna[i] == 'G') {
          twinStrand.push('C');
        } else if (this.dna[i] == 'C') {
          twinStrand.push('G');
        }
      }
      this.complementaryStrand = twinStrand;
    }
  }
};
  
const likelyToSurvive = [];
let i = 1;
while (likelyToSurvive.length < 30) {
  let test = pAequorFactory(i, mockUpStrand());
  if(test.willLikelySurvive() == true) {
    likelyToSurvive.push(test);
    likelyToSurvive[i-1].complementStrand();
    i += 1;
  }
};

const compareSurvivable = (likelyToSurvive) => {
  let mostShared = 0;
  let mostSharedArr = [];
  for(let i = likelyToSurvive.length - 1; i >= 1; i--){
    for(let j = i - 1; j >= 0; j--) {
      let relate = likelyToSurvive[i].compareDna(likelyToSurvive[j]);
      if(relate > mostShared) {
        mostShared = relate;
        mostSharedArr.pop();
        mostSharedArr.pop();
        mostSharedArr.push(likelyToSurvive[i]);
        mostSharedArr.push(likelyToSurvive[j]);
      }
    }
  }
  return `The pair with the most shared DNA was Specimen #${mostSharedArr[0].specimenNum} and Specimen #${mostSharedArr[1].specimenNum} with ${mostShared}% DNA in common.`;
};

console.log(likelyToSurvive);
console.log(likelyToSurvive.length);
console.log(compareSurvivable(likelyToSurvive));


