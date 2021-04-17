import React from 'react';
import {BrowserRouter as Route} from 'react-router-dom';
import ChatSelection from '../ChatSelection/ChatSelection';

const Section = () => (
    <section>
            <Route path ="/" component={ChatSelection} />
    </section>
)


export default Section
