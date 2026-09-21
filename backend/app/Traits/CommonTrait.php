<?php

namespace App\Traits;

trait CommonTrait
{
    public function sendResponse($response, $statusCode = 200)
    {
        $cresponse['status'] = 'success';
        $cresponse['success'] = true;
        $cresponse['data'] = $response;
        return response()->json($cresponse, $statusCode);
    }

    public function sendError($error, $statusCode = 404)
    {
        $cresponse['status'] = 'error';
        $cresponse['success'] = false;
        $cresponse['error'] = $error;
        return response()->json($cresponse, $statusCode);
    }
}