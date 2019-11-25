import json

from django.test import TestCase, Client

from .models import Survey, Cart, Item, Response, SurBingUser


# Create your tests here.
class SurBingTestCase(TestCase):
    def setUp(self):
        cart = Cart.objects.create()
        user = SurBingUser.objects.create_user(username='testuser', password='test', cart=cart)
        Response.objects.create(respondant_id=1, content='content')
        item = Item.objects.create(title='title', question_type='Selection')
        item.response.add(1)
        survey = Survey.objects.create(title='title', author=user, respondant_count=1)
        survey.item.add(1)

    def test_token(self):
        # prepare client
        client = Client(enforce_csrf_checks=True)
        # normal case
        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        # wrong type of request
        response = client.head('/api/token/')
        self.assertEqual(response.status_code, 405)

    def test_user(self):
        client = Client()
        # signup test
        response = client.post('/api/signup/',
                               json.dumps({'username': 'jomjung',
                                           'password': '1234',
                                           'email': 'qwerty@gmail.com'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        # signup decode error
        response = client.post('/api/signup/',
                               json.dumps({'userndame': 'jomjung',
                                           'password': '1234',
                                           'email': 'qwerty@gmail.com'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # signup existing username error
        response = client.post('/api/signup/',
                               json.dumps({'username': 'jomjung',
                                           'password': '1234',
                                           'email': 'qwerty@gmail.com'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # signup bad request
        response = client.get('/api/signup/')
        self.assertEqual(response.status_code, 400)

        # signin test
        response = client.post('/api/login/',
                               json.dumps({'username': 'jomjung', 'password': '1234'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)
        # signin decode error
        response = client.post('/api/login/',
                               json.dumps({'userndame': 'jomjung', 'password': '1234'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # signin no user
        response = client.post('/api/login/',
                               json.dumps({'username': 'jomjjang', 'password': '1234'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 401)
        # signin bad request
        response = client.get('/api/login/')
        self.assertEqual(response.status_code, 400)

    def test_surveys(self):
        client = Client()

        client.post('/api/signup/',
                    json.dumps({'username': 'jomjung',
                                'password': '1234',
                                'email': 'qwerty@gmail.com'}),
                    content_type='application/json')
        client.post('/api/login/',
                    json.dumps({'username': 'jomjung', 'password': '1234'}),
                    content_type='application/json')
        # surveys keyerror
        response = client.post('/api/survey/', json.dumps({
            'item': [{'title': 'Title', 'question_type': 'Subjective',
                      'response': [{'respondant_id': 1, 'content': 'Yes'}]}],
            'tittle': 'SurveyTitle',
            'upload_date': '2019/09/31',
            'survey_start_date': '1999/03/15',
            'survey_end_date': '2019/03/15',
            'content': 'SurveyContent',
            'respondant_count': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # item keyerror
        response = client.post('/api/survey/', json.dumps({
            'item': [{'title!!!!!': 'Title', 'question_type!!!': 'Subjective',
                      'response': [{'respondant_id': 1, 'content': 'Yes'}]}],
            'title': 'SurveyTitle',
            'upload_date': '2019/09/31',
            'survey_start_date': '1999/03/15',
            'survey_end_date': '2019/03/15',
            'content': 'SurveyContent',
            'respondant_count': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # response keyerror
        response = client.post('/api/survey/', json.dumps({
            'item': [{'title': 'Title', 'question_type': 'Subjective',
                      'response': [{'respondant_idd': 1, 'content': 'Yes'}]}],
            'title': 'SurveyTitle',
            'upload_date': '2019/09/31',
            'survey_start_date': '1999/03/15',
            'survey_end_date': '2019/03/15',
            'content': 'SurveyContent',
            'respondant_count': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # surveys
        response = client.post('/api/survey/', json.dumps({
            'item': [{'title': 'Title', 'question_type': 'Subjective',
                      'response': [{'respondant_id': 1, 'content': 'Yes'}]}],
            'title': 'SurveyTitle',
            'upload_date': '2019/09/31',
            'survey_start_date': '1999/03/15',
            'survey_end_date': '2019/03/15',
            'content': 'SurveyContent',
            'respondant_count': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # survey bad request
        response = client.get('/api/survey/')
        self.assertEqual(response.status_code, 400)

        # survey+id not exist
        response = client.get('/api/survey/9/')
        self.assertEqual(response.status_code, 404)

        # survey+id test
        response = client.get('/api/survey/1/')
        self.assertEqual(response.status_code, 200)

        # survey+id bad request
        response = client.delete('/api/survey/1/')
        self.assertEqual(response.status_code, 400)

    def test_cart(self):
        client = Client()
        # sign up and login to bypass @check_logged_in
        client.post('/api/login/', json.dumps({'username': 'testuser', 'password': 'test'}),
                    content_type='application/json')
        # cart test
        response = client.get('/api/mypage/cart')
        self.assertEqual(response.status_code, 301)
        # cart bad request
        response = client.delete('/api/mypage/cart/')
        self.assertEqual(response.status_code, 400)
        # cart post keyerror
        response = client.post('/api/mypage/cart/', json.dumps({'surveyee_id': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # cart post not exist
        response = client.post('/api/mypage/cart/', json.dumps({'id': 2}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        # cart test
        response = client.post('/api/mypage/cart/', json.dumps({'id': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        # cart post exist at cart already
        response = client.post('/api/mypage/cart/', json.dumps({'id': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # cart put(delete) keyerror
        response = client.put('/api/mypage/cart/', json.dumps({'ID': 3}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # cart put(delete)
        response = client.put('/api/mypage/cart/', json.dumps({'id_list': [1]}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_logout(self):
        client = Client()
        # signout bad request
        response = client.delete('/api/logout/')
        self.assertEqual(response.status_code, 401)
        # signout test
        response = client.get('/api/logout/')
        self.assertEqual(response.status_code, 401)

        response = client.post('/api/login/',
                               json.dumps({'username': 'testuser', 'password': 'test'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        response = client.post('/api/logout/')
        self.assertEqual(response.status_code, 400)

        response = client.get('/api/logout/')
        self.assertEqual(response.status_code, 204)

    def test_check_login(self):
        client = Client()

        response = client.get('/api/checklogin/')
        self.assertEqual(response.status_code, 401)

        client.post('/api/login/',
                    json.dumps({'username': 'testuser', 'password': 'test'}),
                    content_type='application/json')

        response = client.get('/api/checklogin/')
        self.assertEqual(response.status_code, 200)

    def test_search(self):
        client = Client()

        client.post('/api/login/',
                    json.dumps({'username': 'testuser', 'password': 'test'}),
                    content_type='application/json')

        response = client.get('/api/search/title/')
        self.assertEqual(response.status_code, 200)

        response = client.post('/api/search/title/')
        self.assertEqual(response.status_code, 400)
