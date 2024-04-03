class Avantage {
    constructor(id_avantage, montant_bonus, tranches_bonus, montant_minimum) {
        this.id_avantage = id_avantage;
        this.montant_bonus = montant_bonus;
        this.tranches_bonus = tranches_bonus;
        this.montant_minimum = montant_minimum;
    }
}

module.exports = Avantage;