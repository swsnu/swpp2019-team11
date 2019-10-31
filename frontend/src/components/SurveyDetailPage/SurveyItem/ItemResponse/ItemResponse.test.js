/*import { mount, shallow } from 'enzyme';

describe('ItemResponse', () => {
    it('should render', () => {
        const itemResponses = shallow(<items />)
        expect(itemResponses).not.toEqual(null)
    })

    it('should render props properly', () => {
        const props = {
            items : [
                {
                  id: '1',
                  itemTitle: 'survey Item1',
                  itemResponse: 'response1', 
                },
                {
                  id: '2',
                  itemTitle: 'survey Item2',
                  itemResponse: 'response2', 
                },
              ],
        }
        let itemResponses = shallow(<items {...props}/>)

        expect (itemResponses.find(itemRes).length).toEqual(2)

        itemResponses.find(itemsRes).forEach((node, index) => {
            expect(node.find('.itemResponse').text()).toEqual(props.items[index].itemResponse)
        })
    })
})*/