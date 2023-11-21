import React from 'react';



const Signin = ({onRouteChange}) => {
    return (
    <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
        <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f1 fw6 ph0 mh0">Einloggen</legend>
        <div class="mt3">
            <label className="db fw6 lh-copy f4" htmlFor="email-address">E-Mail Adresse</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy f4" htmlFor="password">Passwort</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
        </div>
        </fieldset>
        <div className="">
        <input onClick={() => onRouteChange('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Anmelden"/>
        </div>
        <div className="lh-copy mt3">
        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Registrieren</p>
        </div>
    </div>
</main>
</article>
</div>

    );
}

export default Signin;