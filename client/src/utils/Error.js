// import Form from "./Form";
import ServerError from "./ServerError";

const $error = {};

$error.install = function (Vue) {

	Vue.prototype.$handleError = function(vm, error) {

		// if (error.fields) {
		// 	vm.formErrors = Form.applyErrors(vm, error.fields, vm.$refs);
		// } else {
			vm.$root.error = new ServerError(vm, error);
		// }
	};
}

export default $error;
