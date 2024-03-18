class CompteEnergie {
    constructor(id_compte_energie, solde, transactions, id_avantage) {
        this.id_compte_energie = id_compte_energie;
        this.solde = solde;
        this.transactions = transactions;
        this.id_avantage = id_avantage;
    }
}

export default CompteEnergie;