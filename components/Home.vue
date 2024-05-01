<!-- Please remove this file from your project -->
<template>
  <div class="home">
    <h3>Cantina</h3>
    <p>Preço Salgado R$ 5,00</p>
    <br>
    <section>
      <b-list-group>
        <b-list-group-item
          v-for="brother in brothers"
          :key="brother._id"
          class="d-flex justify-content-between align-items-center"
        >
          {{brother.name}}
          <section class="d-flex justify-content-between align-items-center">
            <span class="total">R$ {{brother.debt}}</span>
            <b-button class="btn ml-2" variant="primary" @click="sumSnack(brother._id)">+1</b-button>
            <b-button class="btn ml-2" variant="danger" @click="payModal(brother._id, brother.debt)" :disabled="brother.debt <= 0">Pagar</b-button>
            <a href="/total"><b-button class="btn ml-2" variant="success">Histórico</b-button></a>
          </section>

        </b-list-group-item>
      </b-list-group>
    </section>

    <b-modal
      v-model="showPayModal"
      id="modal-pay"
      ref="modal"
      title="Pagar Cantina"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div class="alert alert-danger"  v-show="showAmountError" role="alert" style="font-size:14px">
          Valor informado é maior que o valor da dívida.
        </div>
        <b-form-group
          label="Valor"
          label-for="amount-input"
          invalid-feedback="Informe o Valor"
          :state="amountState"
        >
          <b-form-input
            id="amount-input"
            v-model="amount"
            :state="amountState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>


  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      brothers:[],
      amount: null,
      amountState: null,
      idToPay: null,
      debtToPay: null,
      showPayModal: false,
      showAmountError: false
    }
  },
  mounted() {
    console.log('mounted')
    this.getBrothers()
  },
  methods: {
    async getBrothers() {
      try {
          const brothers = await (await this.$BrotherService.getBrothers()).json()
          this.brothers = brothers
        } catch( e ) {
          console.log('error :>> ', e);
          this.messageError = 'Ocorreu um erro, tente novamente mais tarde!';
          this.showError = true;
        } finally {
        }
    },
    async sumSnack(id) {
      try {
        const brothers = await (await this.$BrotherService.sumSnack(id, { price: 5, date: new Date() })).json()
        this.brothers = brothers;
      } catch ( e ) {
        console.log('error :>> ', e);
        this.messageError = 'Ocorreu um erro, tente novamente mais tarde!';
        this.showError = true;
      }
    },
    payModal(id, debt) {
      this.showPayModal = true
      this.idToPay = id
      this.debtToPay = debt
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault()
      this.handleSubmit()
    },
    async handleSubmit() {
      console.log('valor >>', this.amount)
      console.log('id to pay >>', this.idToPay)
      console.log('debt to pay >>', this.debtToPay)

      if (this.amount > this.debtToPay) {
        console.log('caiu no if')
        this.showAmountError = true;
        return;
      }

      console.log('nao caiu no if')
      const brothers = await (await this.$BrotherService.payDebt(this.idToPay, this.amount)).json()
      this.brothers = brothers;

      this.$nextTick(() => {
        this.$bvModal.hide('modal-pay')
      })
      this.idToPay = null
      this.debtToPay = null
      this.amountState = null,
      this.amount = null
      this.showPayModal = false
      this.showAmountError = false;
    }
  }
}
</script>

<style scoped>

.home {
  margin: 0 auto;
  max-width: 600px;
  padding: 10px;
}

.btn {
  padding: 4px 8px;
  font-size: 12px;
}

.total {
  font-size: 14px;
  height: 10px;
  color: gray;
}

</style>
