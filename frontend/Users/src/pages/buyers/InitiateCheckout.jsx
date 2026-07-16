import {useCheckoutContext} from "../../contexts/CheckoutContext.jsx";
import {useEffect} from "react";

const InitiateCheckout = () => {
    const endPoint = "https://testsecureacceptance.cybersource.com/pay"
    const {checkoutParams} = useCheckoutContext()

    useEffect(() => {
        document.getElementById('paymentForm').submit();
    }, []);

    return (<>
        <form id="paymentForm" method="POST" action={endPoint}>
            {Object.entries(checkoutParams).map(([name, value]) => (
                <input
                    key={name}
                    type="hidden"
                    name={name}
                    value={value}
                />))}
        </form>
    </>)
}
export default InitiateCheckout
