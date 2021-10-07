<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal">
            <header class="modal-header">
                <slot name="header">
                
                {{ place_name }}
            
                </slot>
                <button
                type="button"
                class="btn-close"
                @click="$router.back()"
                >
                x
                </button>
            </header>

            <section class="modal-body">
                <slot name="body">
                {{ information }}
                </slot>
            </section>

            <footer class="modal-footer">
                <slot name="footer">
                {{ index }}
                </slot>
                <button
                type="button"
                class="btn-green"
                @click="close"
                >
                Close Modal
                </button>
            </footer>
            </div>
        </div>
    </transition>
</template>

<script>


  export default {
    name: 'Modal',
    data() {
        return {
            place_name: "This is the default title!",
            information: "This is the default body!",
            index: "null"
        }
    },
    mounted() {
        console.log(this.$route.query)

        this.place_name = this.$route.query.place_name
        this.information = this.$route.query.information
        this.index = this.$route.params.index

    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

    .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

</style>