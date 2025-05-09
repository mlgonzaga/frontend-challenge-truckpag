import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react' 
import Header from '../components/Header'

describe('Header component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Header />) 
        
        expect(getByText('Studio Ghibli Collection')).toBeInTheDocument() 
    })
})
