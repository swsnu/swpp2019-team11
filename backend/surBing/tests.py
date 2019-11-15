from django.test import TestCase, Client
#from .models import 

# Create your tests here.
class SurBingTestCase(TestCase):
    """def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup', json.dumps({'username': 'swpp', 'email':'swpp@snu.ac.kr', 'password': 'iluvswpp', 'cart', 'cart'}), content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/token')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/signup', json.dumps({'username': 'swpp', 'email':'swpp@snu.ac.kr', 'password': 'iluvswpp', 'cart', 'cart'}),content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)"""
    def test_token(self):
        # prepare client
        client = Client(enforce_csrf_checks=True)
        # normal case
        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        # wrong type of request
        response = client.head('/api/token/')
        self.assertEqual(response.status_code, 405)

    def user_signup(self):
        client = Client()
        resonse = client.post('/api/signup/', json.dumps({'username':'jomjung', 'password':'1234', 'email':'qwerty@gmail.com'}))
        self.assertEqual(resonse.status_code, 201)

