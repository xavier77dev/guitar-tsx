import { useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import useCart from "./hooks/useCart.js";
function App() {

  const { removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartToAdd, cart, setCart, data, initialCart, isEmpty, cartTotal } = useCart();


  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} cartToAdd={cartToAdd} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
