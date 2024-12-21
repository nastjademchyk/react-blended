import { Wave } from 'react-animated-text';

import { Container, Heading, Loader, RatesList, Section } from 'components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRates } from 'reduxState/operations';
import { selectBaseCurrency, selectFilteredRates, selectIsError, selectIsLoading } from 'reduxState/selectors';

const Rates = () => {
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrency);
   const filteredRates = useSelector(selectFilteredRates)
  useEffect(() => {

    dispatch(fetchRates(baseCurrency));
    
  }, [dispatch, baseCurrency])

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
{isLoading && <Loader />};
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;

