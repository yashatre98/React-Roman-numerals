import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Heading,
    View,
    Provider,
    defaultTheme,
    Flex
} from '@adobe/react-spectrum'; // Import Spectrum components
import log from '../../logger'
const SpectrumConverter = () => {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');




    // API Call
    const handleConvert = async () => {
        log.debug('Spectrum button clicked');
        setError('');
        setResult('');
        try {
            log.info(`Fetching result for number: ${number}`);
            const response = await axios.get(`http://localhost:3000/romannumeral?query=${number}`);
            setResult(response.data.output);
        } catch (err) {
            log.error('API Error');
            setError(err.response ? err.response.data : 'Error connecting to server');
        }
    };
    const handleInputChange = (value) => {
        // Allow only numbers between 1 and 3999
        if (/^\d*$/.test(value)) { // Check if it's a number
            const num = parseInt(value, 10);
            if ((num >= 1 && num <= 3999) || value === '') { // Allow valid range or empty
                setNumber(value); // Update state only if valid
            }
        }
        else{
            log.warn(`Invalid input: ${value}`);
        }
    };
    return (
        
        <Provider theme={defaultTheme} >
            
                        <View
                UNSAFE_className="spectrum-container"
            >

            <Flex 
                    direction="column"
                    alignItems="start"
                    justify-content="flex-start"
                    gap="size-200"
                    margin="auto"
                    
            >
                
                <div class="panel-facts">This panel was made using Adobe Sprectrum components. Theme detection is automatic.</div>

                <Heading UNSAFE_className='spectrum-heading' level={1}>Roman numeral converter</Heading>
                <TextField
                    label="Enter a number:"
                    value={number}
                    onChange={handleInputChange}
                    description="Enter a number [1-3999]"
                    UNSAFE_className='spectrum-input'
                    width="size-4600"
                />
                <Button variant="primary" onPress={handleConvert} marginTop="size-200" UNSAFE_className="spectrum-btn">
                    Convert to roman numeral
                </Button>
                {result && <Heading data-testid="result" level={2}>Roman numeral: {result}</Heading>}
                {error && <Heading level={3} UNSAFE_className="error">{error}</Heading>}
            
            </Flex>
            </View>
        </Provider>
        
    );
};

export default SpectrumConverter;