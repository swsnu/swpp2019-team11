import json

from django.test import TestCase, Client

import datetime

from .models import Survey, Cart, Item, Response, SurBingUser, Selection, SurveyOngoing


# Create your tests here.
class SurBingTestCase(TestCase):
    def setUp(self):
        cart = Cart.objects.create()
        cart.save()
        user = SurBingUser.objects.create_user(username='testuser', password='test', cart=cart)
        user.save()
        response = Response.objects.create(respondant_number=1, content='content')
        response.save()
        selection = Selection.objects.create(number = 1, content = 'selection')
        selection.save()
        item = Item.objects.create(number = 1 ,title='title', question_type='Selection')
        item.save()
        item.selection.add(selection)
        item.response.add(response)
        item.save()
        survey = Survey.objects.create(
            title='title', 
            author=user, 
            respondant_count=1, 
            upload_date = datetime.date(2019, 1, 1),
            survey_start_date = datetime.date(2019, 11, 11),
            survey_end_date = datetime.date(2019, 11, 11),
            target_age_start = 20,
            target_age_end = 29,
            target_gender = 'M'
        )
        survey.save()
        survey.item.add(item)
        survey.save()
        

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
        response = client.post('/api/make/', json.dumps({
            'item': [{'title': 'Title', 'question_type': 'Subjective',
                      'response': [{'respondant_id': 1, 'content': 'Yes'}]}],
            'tittle': 'SurveyTitle',
            'upload_date': '2019/09/31',
            'survey_start_date': '1999/03/15',
            'survey_end_date': '2019/03/15',
            'target_age_start': 20,
            'target_age_end' : 29,
            'target_gender' : 'M',
            'content': 'SurveyContent',
            'respondant_count': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # item keyerror
        response = client.post('/api/make/', json.dumps({
            'item': [{'title!!!!!': 'Title', 'question_type!!!': 'Subjective',
                      'response': [{'respondant_id': 1, 'content': 'Yes'}]}],
            'title': 'SurveyTitle',
            'survey_start_date': '1999/3/15',
            'survey_end_date': '2019/3/15',
            'open_date' : '2020/1/1',
            'content': 'SurveyContent',
            'target_age_start': 20,
            'target_age_end' : 29,
            'target_gender' : 'M',
            'respondant_count': 1,
            'target_respondant_count' : 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # response keyerror
        response = client.post('/api/make/', json.dumps({
            'item': [{'title': 'Title', 'question_type': 'Subjective',
                      'response': [{'respondant_idd': 1, 'content': 'Yes'}]}],
            'title': 'SurveyTitle',
            'survey_start_date': '1999/3/15',
            'survey_end_date': '2019/3/15',
            'open_date' : '2020/1/1',
            'content': 'SurveyContent',
            'target_age_start': 20,
            'target_age_end' : 29,
            'target_gender' : 'M',
            'respondant_count': 1,
            'target_respondant_count' : 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # surveys
        response = client.post('/api/make/', json.dumps({
            'item': [{'number' : 1,'title': 'title_test', 'question_type': 'Selection',
                    'selection' : [{'number' : 1, 'content' : 'test selection'}],
                    'response': [{'respondant_number': 1, 'content': 'Yes'}]
                    }],
            'title': 'test',
            'survey_start_date': '1999/3/15',
            'survey_end_date': '2019/3/15',
            'open_date' : '2020/1/1',
            'content': 'SurveyContent',
            'target_age_start': 20,
            'target_age_end' : 29,
            'target_gender' : 'M',
            'respondant_count': 1,
            'target_respondant_count' : 1}),
            content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # make survey bad request
        response = client.get('/api/make/')
        self.assertEqual(response.status_code, 400)

        # completed survey+id not exist
        response = client.get('/api/survey/completed/9/')
        self.assertEqual(response.status_code, 404)

        # completed survey+id test

        survey_id = Survey.objects.all().values()[0]['id']
        response = client.get('/api/survey/completed/'+str(survey_id)+'/')
        self.assertEqual(response.status_code, 200)

        # completed survey+id bad request
        response = client.delete('/api/survey/completed/1/')
        self.assertEqual(response.status_code, 400)



    def test_cart(self):
        client = Client()
        # sign up and login to bypass @check_logged_in
        client.post('/api/login/', json.dumps({'username': 'testuser', 'password': 'test'}),
                    content_type='application/json')
        # cart test
        response = client.get('/api/cart')
        self.assertEqual(response.status_code, 301)
        # cart bad request
        response = client.delete('/api/cart/')
        self.assertEqual(response.status_code, 400)
        # cart post keyerror
        response = client.post('/api/cart/', json.dumps({'surveyee_id': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        # cart post not exist
        response = client.post('/api/cart/', json.dumps({'id': 2}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        # cart test
        response = client.post('/api/cart/', json.dumps({'id': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        # cart post exist at cart already
        response = client.post('/api/cart/', json.dumps({'id': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # cart put(delete) keyerror
        response = client.put('/api/cart/', json.dumps({'ID': 3}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # cart put(delete)
        response = client.put('/api/cart/', json.dumps({'id_list': [1]}),
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

    def test_survey_ongoing(self):
        client = Client()

        client.post('/api/signup/',
                    json.dumps({'username': 'jomjung1',
                                'password': '1234',
                                'email': 'qwerty@gmail.com'}),
                    content_type='application/json')
        client.post('/api/login/',
                    json.dumps({'username': 'jomjung1', 'password': '1234'}),
                    content_type='application/json')
        
        client.post('/api/make/', json.dumps({
            'item': [{'number' : 1,'title': 'title_test', 'question_type': 'Selection',
                    'selection' : [{'number' : 1, 'content' : 'test selection'}],
                    'response': [{'respondant_number': 1, 'content': 'Yes'}]
                    }],
            'title': 'test',
            'survey_start_date': '1999/3/15',
            'survey_end_date': '2019/3/15',
            'open_date' : '2020/1/1',
            'content': 'SurveyContent',
            'target_age_start': 20,
            'target_age_end' : 29,
            'target_gender' : 'M',
            'respondant_count': 1,
            'target_respondant_count' : 1}),
            content_type='application/json')

        

         # completed survey+id not exist
        response = client.get('/api/survey/ongoing/9/')
        self.assertEqual(response.status_code, 404)

        # completed survey+id test
        survey_id = SurveyOngoing.objects.filter(title='test').values()[0]['id']
        #participate
        response = client.post('/api/participate/'+str(survey_id)+'/', json.dumps(
            [{'number' : 1, 'content' : 'content_test'}]),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)
        #ongoing survey check
        response = client.get('/api/survey/ongoing/'+str(survey_id)+'/')
        self.assertEqual(response.status_code, 200)
        #participate survey not found error
        response = client.post('/api/participate/10/', json.dumps(
            [{'number' : 1, 'content' : 'content_test'}]),
        content_type='application/json')
        self.assertEqual(response.status_code, 404)
        #participate  bad request
        response = client.get('/api/participate/10/')
        self.assertEqual(response.status_code, 400)
        # ongoing survey+id bad request
        response = client.delete('/api/survey/ongoing/1/')
        self.assertEqual(response.status_code, 400)


    def test_making(self):
        client = Client()

        client.post('/api/making/',
                    json.dumps({
                        'title' : 'test_title',
                        'survey_start_date' : '2018/'
                    }),
                    content_type='application/json')

