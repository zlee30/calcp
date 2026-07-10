const exprEl   = document.getElementById('expr');
const resultEl = document.getElementById('result');

const GLYPHS = {
  "(": "iVBORw0KGgoAAAANSUhEUgAAABQAAABBCAYAAADRyoRJAAAAdElEQVR42u2X0QmAMBBDW+lSgjs5izsVHEsnMKXxhKovv6WPC2khlxK6q9x7oc7roc6n6AkBPpxyK9EuYAu27FsOs3wFs4Fq+jFSDresVJynIYGuNf4yQIAAAQIECHDEju2UJdV5rI79w0r84dWMBRwgeo1OvhsfsEmjEmQAAAAASUVORK5CYII=",
  ")": "iVBORw0KGgoAAAANSUhEUgAAABUAAABBCAYAAAA+CO93AAAAgklEQVR42u2X0QnAIAxEjXSpgjs5S3cqdKx2ADHF01Js3/0GXoKXSBICGi3b13zWgunYTIFGL+gllKGqfg411QyvM0x134Pi/iwt9cTsS7/QXTLcBwoUKFCgQIGyoOkL2qJWI+38apUfcV89ywujet6x+YxsrTqOBjL7L0B7ehVNoAvHJyVEofXeagAAAABJRU5ErkJggg==",
  "/": "iVBORw0KGgoAAAANSUhEUgAAACoAAABBCAYAAACn8DbCAAAAeUlEQVR42u3YzQmAIACAUW2roJ2cpZ2CxrJrdNCDQpnv3SLQjw7+FAIAfEnsMcixplx6v5178zzLKF9UqFChQoVOEgow8gn/WFPucUqv3QZKc8TaNcLOJFSo0EmNsjwClpmW82hrpD/OQoUKFSr0nS30vkM9nwHgXy7W4yEkwMtMRgAAAABJRU5ErkJggg==",
  "7": "iVBORw0KGgoAAAANSUhEUgAAACkAAABBCAYAAABMx43BAAAEEUlEQVR42u3Yu28cVRQG8O/cxzzWjyROIgwRAhQpiIUShI2wNlYKDNSThiI9kuUEgeiw3EKV0CB3ab0VfwDarHCcpDAFQltElrFElMg2yfqx3p3XvYdi18IOJtiCWS8wV5pmp7i/vTP3O+cOzY9OMXp8CPwLRo7Mkb2HZE57Han6lacaaZgy0bFEETETiNQzkZsUv1CQ+qEvNQzbriMtMxomAoH+/I8AwMLItXPCagJaXcMlhoSWbI2UFwaV991G2kwIpA9ebYAIOLaqM//Op+eHlF56nOzEBHIO3DgEMHew3b0CyQARxz4fJoII4G5fQJEJYCsE/0dyMkf+j5CU9QRzQSDfWivqFazs+32g4Yrt/siK6FTxtOMv1p8RQXTcq1QpfXJmGN7647gRgg/mqOwmL6nxajW9PTr13lmn/7O1aDvmPStFaFcQik1fnZrMIPmc26/5gJXLDDnQeJWAKoj4lSGn79J2GsERe6drc1I2sMyIYfR63JgwYP10Z6ayfpwWNnwS75iWScKWSbynXjbrCiWMtauptR+N3bt+q6uP+/fmQBARSQASBLn/LpMiKUJOtsbu3bi1MHLNf/DigzhA0F3kXw0GgwiKg0AuLu+kl8tlA5R7MSeJqVw2ecXJ/Izzz2bjtDrnD8klLMFrGX1/YlKsbkJzLyHHqzMpgN2Mi9qd9+SqIgGmvfWELZgSECwzBMBx5shKaVqNV2fS26NXPzyjC5fWkkZKTA4TLFt+fSNpgRgaBFgwPKHEKV1wLVsMKB/LzV9fAoDlVp0yQ76MFQUgZeYPhr3BjxNYaGpHYmgTbCYhJJFiZluQWrRM8vOq2fqGwbJhYgNCHQCCWjHNDJn4g9wuIFRfjbbizaQZWcDtnPSEJFLciRpfaIQmXXr37vUv/9jtzNjM30kGS4AcBjEBzm4nwfvKJMMC/k/FaUeebLpmoxCF/iN+c3E26crGOXwTy/aN2kx8f2KSXlv4Ks5sd1dK0+rsOkQNNaxt7ThzxYCZWB5ite2eBMg2gjpxsztiAJgfubohiEAAW2YLon2ljtmmmqRPRMMAoFtblAmSg0BSuWy+f3vq/dOOf76eNi0xOQacAnxxx8QwbFWfckWfdMRuE8vM8KSjn8SNJoNnK6VptXLIFT0y8s4vcND+aPT5896JkogFBASIgEYaoZ407YDyVMskPzZNsgCwAiglZjPksNq2yQ8X79yYnSsGzuVaOc4EGbmFTprg0cNwM6onrYQB3dkQUpE0g8pzW2n07djdr7848HB2BODf3d2aiFwQBHWQAIHB1jCDiE5WSle8Ae2620kU7cb++nrNHgWYWQR1DllmvHozrJSuYLx6M8y/YOTIHJkjc2SOzJE5MkfmyByZI3NkjsyRvTl+A/CtEEhdshGdAAAAAElFTkSuQmCC",
  "8": "iVBORw0KGgoAAAANSUhEUgAAACkAAABBCAYAAABMx43BAAAFMElEQVR42u1azW8bRRT/vdnZjzi20zT0I22VE0LgRoWIHhyREnqjXCFcOHDjRJ224oKEFPnEjdL0L+DApeUMFZcoiiuiqqItas2hSKgBNYUodbHjsB+z8zjYK0qytlu8Vl3JTxppvbP75rfP896895shtJFvXzxtv/PLRW8lP/9jxrSnaoGriUggAWGwThu2qCvvzszq4uTt3II1WS76cc/KVkqaL3mlfOFmSprHaio5gE8rovMXwyIQ4RlKR5AEaDxjEXgO5LkASQCwNLuwy4EyW7BqafimV7k1LO3cVuhpQmKezQCCtGFbW8orK3v01Wi8WO++/vpH5vHlYhDTpwCglJ9XxFAAhZyA5RkMA8K0DWkxsyJCeHK5qKLxWlpyZfr0rxLSDjl8rIeIwQDzCxk5JJPwb82MMSuFte2HJaXUuZdHDl27W9+og1AjEMDMsSBXpud/s4VxhLAbRcAhRuQQNv2tU5bG7cAkYQb8v739bwCHh/bCt6vbk9+ff3hz5pO3pZDfVZULk4yW70lHyCOeVmCAY8zsCcAxWdzLX7vwe9IO8Sio3ztg74Fmdl1WdkvvdrXiJiDa2QAQA2BSQwwQz80Z3LjXVbs0N2cAgEViiKPJ1abJJpj2k50EE8CcyzHFWPypnSeX40jvIJgPQA5A9gwkw+17kPvttEP9DvKBVz3FYF9Q/0IVb65evAKGJlB/Ow5T96tIL0WWpucvgWHpPsYp9pqpOSIY3M8gH/p1xf3u3SCSfV+IreTnXSK0Sji9UTNlV73t/NiovulkpHBrqus6PNKzWRGvZe3UaiXY9oB4DMzw5EEnYz/wqj6YmHan5q4AWaZFay9dueglbaHrJ86siUZe7e50iUYmznTQydpUyhfOjlnDX1hC4nEPZwY0GG4YoBpsf03C+JPAxA2lXdbRDT2sw/1ZM/WBY5gQ+C+ZI0DwtcKmXz9HjbK1cFYIYWqtH/sSMsDQmvTZQ87IgZA1kgz4DIZBAvfdv/4QLM6DIAj/lqtCCGitg5nVxfPUjnIDgKv5wo1h6RythW6YcNakM4Zj1JV7543Vxal27B5FFzH9FgD/UbZyI2kGo2nJiJ8s76mOTkXj7Xxuslz0ZXQR8wWYLBf9Ur7Q6zDKk+WiH40XO4cv5ebirIh92GdtYMM/lB3vuSXvV9enovFi1+73y5dbzUe/OSd9YigCKQaM5JgyCokhCfCbGPw2wbzwcYsuSaBQI/x03B4ZV9CJJnMMQEJg3ftrXcD4nMEGwLGkFd196zNupYSZsR36qCrvG4Ow2QxNicRJAAgZY1lpv5cyLBC1DnDygVtruZIQsTtmprOhGRSOr3y53oMVZ9wh890Nv1ZlJqdlPtlm3QZA0GAKfJ5Ymv2wksnYolbzul67Iz2ByxPaZgLIaYdDdv5rAC20f3L5K5cXFgQVi12DjPRcnT7tP8k8H5ADA5ADkAOQA5ADkAOQA5DJg+Qn2OFSrIkBQrlMSWzbRXoU6867cQALR0iKfiCmEQBbC5cApsuXQ2rc66419TT1Im7cyHiOkCS9MFg3hRwnol3bhgFrRwMIiA4vnzhTSYcmbRlB1+VDpCfw9WENgIgcc1chSmBmeGGwHtEsawYZThizlc3g0WFpS9EDTl2DUVeeIlBlZ59BAiGH7szq4oRcml2QM8vFiVaKStOFnwTjlS3thWBOrKQFUZgWlkGEn2d+uHCs1WNLswuy40ER6VVupXtIDnQ6KHJyuaioHVHUpFluD0v7aA8ZjI5n1QbBfACy3+QfSinC+Oh7t6QAAAAASUVORK5CYII=",
  "9": "iVBORw0KGgoAAAANSUhEUgAAACcAAABBCAYAAABSDr1yAAAFYUlEQVR42u2a22tcVRTGv7XPPpeZZMamTWJbarGgrZ1Koa3QtDaEPgihrzJ58MG+2QeZeCkqRWEIIqKCtCkI+ickz5a8xaapqUpQaBxLKNVeMC3TS5xMMue29/LhJNG0M5lcZlqFWbAZZs6efX7n22ftvdY6h1DGBlJpqyc36F/o6L3SJO1dc8rTAAnUwBisE4YjZpR7uXOsf+9EKmu9mOvzy/WtyQnrZQ24BtzjNhruysqHf5wpTlmJ5i2+6T34NS7tnXXx1rA0Edob9yWKsGaaUdZbabmBRg/15pqE/fys9hXXTmWdFLZRUO5E56X+fcsqN9rR++cjV0fz0IzWhHQkUW2nixkohKWQiO4SCGDmcv2kbZhbyh0IWCFpOnjgu6+YWl0JFAnTYL0eqFlDGU3KUKGkva1W87fTQWmzKYyK/aWrQ65wzBcgW7J5vePH07dqqdzFQyc3CBA0s+vq0K7orQRQuQYwRdRejAFipI3oc+1tuKtLMkBAEJtXhGiZVvUmZzKYAAZSTMC6Wr69nQlgJsGNRbgB14BrwDXgGnANuAbc/wdOMsNbjNkJFgBisA+Gx2BTsLAmuzP2zemCmNyQWVckXCh5xmR3Rk39JayVxExys5NYjETvuIVQQat2O2lrsGXCQCn0r+8cOuvVUpFLXe/fMKI0haslOO8wQxBBJ0znyzYrgWtz+U8ZuBMT1ocAhkrazxMgGMTrgSIwMYgJeNoR5muuChQIRuX+/7ILhzJvtpnJphdGPvkcAEY6eie2x1r2uDoAoXYpWMgK9/w5GETLSkcTqayVQw4ppLBQihruOu7k88/qrcnpy3Fp7ZhTXi3zVgBEBJhVkm9/iRwDqbSV2pPCjZ9/oGNXh7x61OdWNv1Am9WMJaWIntygj1wE+cTqIyAw6zDvz35WRQ0KGMyPdeElgiYEL4+d/kiW6zDlz8xPN28TEMQMbzmvWrU6zAQiuZLpfcQG0mkjjTRGb1085Qj58SYzDo9Vzfw1ZI37FbxVEEExB2B+t+L5uCsr6Xxf+N3BzActZnxHQZV0lIivq4IjQKQF0GYL+aqrwrLrHAFotxPLi7FcpXudO8S2Fpg3817RBcGpUInyqioxkcpa+TYI4I91Q/mWMizfUJa/aX+L6Vy87896INiruufqZQPptNEzOKhGD7/90iYZ/+leFbhGPNeAa8D9b3KIeg7OACGbJfRF38evTQlGlkd0oXq5F6ypnmBUIUcYPfzerlZpXcl7MyUSS9c55ihuSkiHZH3AmAjEXx94I96d3Lb7dzevDU1CCAitoTW83QoSjjRj8qEYloigWaMYeuNUD7DxAyekEmZSmrGT25taTk25BZjCiHQkQDPjnl90BYnJf4SOzICBEKHXOdZ/sObK9T/Xa701/o03cjBz/JlY8lSucHtaCIrT/GMNTayfMhyDQL8dGTuzv9I457ozds3htlgbOVoGxExReaEk4TBgLeziBOgoWSLzXHfGThYcq5B0l0Y+V4FjQ2e9+nkrsUEgyUBYKRw+NnTWm0hl+cj3X6z+BYS1PEJq9u8T1yjakVVi+NUnN1ej0sUFIKAl17mYXTFHT015rXAEgEeOZNriZEglJLs6XJEaYk6bOi4C+Ko1ZA0QDEsYi//VYMMWEsXQtdcEN5BKmz25QZ9C8UvSad46G3qwscJUNhbpFEiFu/4swNC+UvlFCQnaRyCIcBsA9sS28hqnlR/MBG57SfsavNp9mMJWq9nJ+8WBzktnXq/Ya/xEsCY4BiRF+aUGra4cwQBztOpa0UsOeQdocxeO59tz3DM4qJ7Yxr+wWx493xcOdx0Pj57/KmzEcw24/zLc389KdeTApbpyAAAAAElFTkSuQmCC",
  "*": "iVBORw0KGgoAAAANSUhEUgAAACwAAABBCAYAAACq7kaFAAAA3ElEQVR42u2ZwQ2DMAxFTZSlkLoTs7ATUseip0o9NKZxHbvQ96+I+BHZH8cRQQghhK6saZuXvfXwdl+naCCNR0SknG2HAQYY4Ghb+8RKRthdb8xn3NoCsCzoJW1DyOG/BNbSsXotqOWdZz2UiF3xLLra+5K3e/RaJEUH8Ltf8y8Wlxuw9UO8jlvkMMAAB/fO17c1y6TIc7pE0QF8duCabVW9x61qDfS66DYvuxbEc+5RvoX17MSGAWdOhXCJ4b2EdYqY1TBxi0QOAwzwAXDLCTIc4ihuFhNCCCEUpwfeaWXyCDw4ugAAAABJRU5ErkJggg==",
  "4": "iVBORw0KGgoAAAANSUhEUgAAACgAAABBCAYAAACjBeb/AAAArklEQVR42u3ZTQ5AMBCGYSMuJXEnZ3EniWOxsiMt+nVafWdlockTnZ+mrBPHOs77+Txtiz1dbzmBVxFC9564mJAC32xpVmCKYIt//wWHUiAUCUCAXkBlBUe3GTVC3gfvpkbxo44i8c6/drY4xbFKBlTiqmjUtJnPk8S7jSQZdepCIAe5WQAIECBAgI0CY05KoXes9OMWOQgQIEBx8L+YHAQIECBAgAAB1gtMcQV8ACXfOwsjP1HvAAAAAElFTkSuQmCC",
  "5": "iVBORw0KGgoAAAANSUhEUgAAACgAAABBCAYAAACjBeb/AAAAs0lEQVR42u3ZUQqAIAyA4S26VOCdPIt3CjxWvUoPtWI2hX+vhXysuWapiMi+5UN+ilSL3l1vLakW1T9xX2KRwQMgQIAPsXr0rmsPs97vBvRqwtQgQIAAAQIECBAgwLcRfnB/GnJ5xAABAuzdB9svAsMCo8KSGGoQIECAAAECjI3V8sLu8XvBNYOR4xg1CBBgBHDf8uG184c+1aVaVC3Z6I2gBgFOCxxhd8+dwR5zYLumZf0TJwM1WMQ96REAAAAASUVORK5CYII=",
  "6": "iVBORw0KGgoAAAANSUhEUgAAACcAAABBCAYAAABSDr1yAAAArElEQVR42u3ZwQ2AIAyF4dawFIk7OYs7kTgWXo0XIFSL8vfmRT9j+7RRpaNS3PL1eD12FcNSS1xrlW5mkYELHLi3K7wxlY9FSQvMOueCxUmsUQwEOI9++0bOeeVYMedqYE8+OqYVHDhw4AYt9Xx1sVSDAwfu7zlXykC3z/Sa69Jz4MCBAwcOHDhw4MDNhbvvCSluuWWh0tplw2X7stiSegD0HDhwU+C8/rWKiJyuVDfBJpHalwAAAABJRU5ErkJggg==",
  "-": "iVBORw0KGgoAAAANSUhEUgAAACoAAABBCAYAAACn8DbCAAAAQUlEQVR42u3QgQkAEBRAQWyl7GQWOyljsQTl190Er5cSAAAAALyRZ+07QmiJclSoUKG3Qtsa+ffICI0AAAAA8NwBI+AFpWDvlQ0AAAAASUVORK5CYII=",
  "1": "iVBORw0KGgoAAAANSUhEUgAAACcAAABBCAYAAABSDr1yAAADxklEQVR42u2aP2wbVRzHv7937+7s+Oy0VYIEVSW6ZIgillZVEsmysrFAJ4RASGYBJrsDI4N7YwcGtxMVEmLjz1K1QxkqWZGL3KHdkCWQYIAUUFvSyPGfu3d378fgOG1DbOdMnSB6T7rl7j39Pu977/d99vsdYYJWKxRTa+tfevWV8hfzlvP+Q9UJCDCf7sNAMGdmzEeq81X+TvWdwZg4cQT+wy2Bm7TJcR3unvnQTPVepiaau/fMwDC/WXxL05QnNxbu7L2rwT63FQDUVy50Bejw4e6e+cw8e++joL5cvpY17IW29vXuMmAiEDODX/kr6B5oks8VLtX7vS8J4TVHpk5HEWOvSr4OEXAEAtGRvFYCWtuRp7uR0v9MIKJpgR0IjgFBINEHJZFYyUC5WqGY2u9Bu7dp1QpFAX96r20s3Ij9zuvbRVkRoAAKwX2lGSACGIBJBIOnBVdfLl/dNxGIBIF1qPnVGcuy0tKyBhLyDl0r8NCJFMSUxJXzdvaDYamgmRGyxh/+9qdE/NvA3wQgNRACeDcr7XOdUEUgGM8d7pHaVkNNhOHNWU6WjNTl/PeXft3bo75aWshI61wnUhEwBTiArFFOwmAi9k7+sFj5s5VrGblWLmo7mymnfcLbwmNHMw/W4FFZCQVLTVdtnNpQS01X9dIttdR0FTP0C/x7jjkcvUVwyGJqbjEa7riVkWBEYA6fvRAxczBrzkjSoXUkJrypOtdzZvpNSQKMJwJpZphkOFtBpy60eMgAXVxcPFQFZf7O5fP15dINgwxb85PYLFjNmY5185efz3+88W2PURGu6+pDhasViqn8+pU3hi65SkW03IogHC7Y7t760+sl+36v9YxVnUzn+H7vBMG96LugI0kICQAL313xh3dxk7+GCVwCl8AlcAlcApfAJXAJXAKXwCVwCVwCl8C9KHBUK1RilyOPW237sXJ8U219PmdliqM/QOh+Hdqz7w3GxIkj19bdcIJJhQBQX7nQG1UMJhCI2duJETuOvL1aWostNwuLSSvWfNrXIYhBexmJQYpDMOHU7dXS2mBMrDg/Fj6JffbG6NNshx66UTC0vKSZkTZM5GRqd0ws5R74bX/iBQtIg2joUbtBBD8KowdRe5KlA0kE+99kFI97RjBowtJT4nP/SzhpkEDEk5/iC6KxWcg7tds4zSABGbLuEjAzWbYSItb9EvtIX4RBRDbj4IAh667IN6oZZvaMuF9lMLyXbAdgXc43qplbjWOz+UY18/R1q3Esm29UMxD67XnbARjeQRRjZi/fqGb+BiQkp1NiG6QAAAAAAElFTkSuQmCC",
  "2": "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",
  "3": "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",
  "+": "iVBORw0KGgoAAAANSUhEUgAAACoAAABBCAYAAACn8DbCAAAAa0lEQVR42u3Y3QmAIBSAUY2WEtqpWdopcCzdoB8M0Tjfq6AH8eFiCJIkjVT8YpMz7eVqfctH8znLLDcKCgoKCgoKCgr6S+j6ZPDtMVzfDd6xB9IbBQUFfZ8PCG8UFBQUFBQUFBQUFFSSpFmqmlERMEAkEh4AAAAASUVORK5CYII=",
  "%": "iVBORw0KGgoAAAANSUhEUgAAADYAAABBCAYAAACaYlekAAABIElEQVR42u2aUQ7DIAiGR+OllninncU7LfFY21OTZXFrrdIC+XitqXwCP1Z7u2EYpmny7+Hz/nhtvSDXIhbBlhGonnFmwLxbWLDkxdGtlP+u9WXmxOvkFupOelbic2yuRXpX8cyIpZ7BVqUdVbTYo3qzxaQqzljQEKnYimaKAIF4AAaYwU2wVi/T7pEyY/IjWy3tfSY1BhhggOnI/YgiXvnZo/pFfObRATUGGGCAAabax7T61ejdXNJ24KrTY2oMMMAcqOJM8dlz77YlXLkWkaMOtF7WclJDUfeAT4nY6sBZ0r4nqogHYIABNqePWf3pS7VBe/rPw/Qd9Ej2XAqmddiaa5EUoZ5aC7REhAoB9itlw/Yx8RYJ96noqWdiGBbI3nNqh8ribzFFAAAAAElFTkSuQmCC",
  "0": "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",
  ".": "iVBORw0KGgoAAAANSUhEUgAAAAwAAABBCAYAAADls0VVAAAALElEQVR42mNgGAWjYBSMglEwCkbBKBgFQwwwHrHM/0+KBiZSbRjVMKqBWhoApooChzUtAywAAAAASUVORK5CYII="
};

let lastResult = '0';   // plain-text copy of what the result line shows

function charHTML(ch) {
  const b64 = GLYPHS[ch];
  if (b64) {
    const alt = ch === '/' ? '\u00F7' : ch === '*' ? '\u00D7' : ch;
    return '<img class="g" alt="' + alt + '" src="data:image/png;base64,' + b64 + '">';
  }
  return '<span class="tx">' + ch + '</span>';   // fallback for letters (e.g. "Error")
}

function render(str) {
  let h = '';
  for (const ch of str) h += charHTML(ch);
  return h;
}

let expr = '';          // the expression being typed
let justEvaluated = false;

// ---------- helpers ----------
const isDigit = c => c >= '0' && c <= '9';
const isOp    = c => '+-*/'.includes(c);
const last    = () => expr.slice(-1);

function openParens() {
  let bal = 0;
  for (const c of expr) { if (c === '(') bal++; if (c === ')') bal--; }
  return bal;
}

function updateScreen(resultText) {
  // Render every character using the calculator's own pixel artwork
  exprEl.innerHTML = render(expr);
  if (resultText !== undefined) {
    lastResult = resultText;
    resultEl.innerHTML = render(resultText);
  }
}

// ---------- input handling ----------
function press(key) {
  if (key === 'C')    return clearAll();
  if (key === 'back') return backspace();
  if (key === '=')    return evaluate();
  if (key === '()')   return paren();

  if (justEvaluated) {
    // After '=': typing a digit starts fresh; an operator continues from the result
    if (isDigit(key) || key === '.') expr = '';
    else if (lastResult !== 'Error') expr = lastResult;
    justEvaluated = false;
  }

  if (isDigit(key)) {
    if (last() === ')' || last() === '%') expr += '*';   // 2(3)4 -> implicit multiply
    expr += key;
  }
  else if (key === '.') {
    // only one decimal point per number
    const m = expr.match(/(\d*\.?\d*)$/);
    if (m && m[1].includes('.')) return;
    if (expr === '' || isOp(last()) || last() === '(') expr += '0';
    expr += '.';
  }
  else if (isOp(key)) {
    if (expr === '' && key !== '-') return;              // can't start with + * /
    if (isOp(last())) expr = expr.slice(0, -1) + key;    // replace operator
    else expr += key;
  }
  else if (key === '%') {
    if (isDigit(last()) || last() === ')') expr += '%';
  }
  updateScreen();
}

function paren() {
  const l = last();
  if (openParens() > 0 && (isDigit(l) || l === ')' || l === '%')) {
    expr += ')';
  } else {
    if (isDigit(l) || l === ')' || l === '%') expr += '*';  // implicit multiply
    expr += '(';
  }
  updateScreen();
}

function backspace() {
  if (justEvaluated) { justEvaluated = false; }
  expr = expr.slice(0, -1);
  updateScreen(expr === '' ? '0' : undefined);
}

function clearAll() {
  expr = '';
  justEvaluated = false;
  updateScreen('0');
}

// ---------- safe evaluation ----------
function evaluate() {
  if (expr === '') return;
  let s = expr;

  // close any unclosed parentheses
  s += ')'.repeat(openParens());
  // percent -> divide by 100
  s = s.replace(/%/g, '/100');
  // implicit multiplication: 2( -> 2*(   and   )2 -> )*2
  s = s.replace(/(\d|\))\(/g, '$1*(').replace(/\)(\d)/g, ')*$1');
  // strip trailing operators and remove empty () pairs
  s = s.replace(/[+\-*/.]+$/, '');
  while (s.includes('()')) s = s.replace(/\(\)/g, '');
  s = s.replace(/[+\-*/.]+$/, '');
  if (s === '') return;

  // whitelist check - only safe calculator characters allowed
  if (!/^[0-9+\-*/().]+$/.test(s)) return showError();

  let value;
  try { value = Function('"use strict"; return (' + s + ')')(); }
  catch (e) { return showError(); }

  if (typeof value !== 'number' || !isFinite(value)) return showError();

  // round away floating point noise (0.1+0.2 -> 0.3)
  value = Math.round(value * 1e10) / 1e10;
  let out = String(value);
  if (out.length > 14) out = value.toExponential(8);

  updateScreen(out);
  justEvaluated = true;
}

function showError() {
  updateScreen('Error');
  justEvaluated = true;
}

// ---------- wire up buttons ----------
document.querySelectorAll('.key').forEach(btn => {
  btn.addEventListener('click', () => press(btn.dataset.key));
});

// ---------- keyboard support ----------
document.addEventListener('keydown', e => {
  const k = e.key;
  let mapped = null;
  if (isDigit(k) || '+-*/.%'.includes(k)) mapped = k;
  else if (k === 'Enter' || k === '=') { mapped = '='; e.preventDefault(); }
  else if (k === 'Backspace') mapped = 'back';
  else if (k === 'Escape' || k.toLowerCase() === 'c') mapped = 'C';
  else if (k === '(' || k === ')') mapped = '()';
  if (mapped !== null) {
    press(mapped);
    const btn = document.querySelector('.key[data-key="' + CSS.escape(mapped) + '"]');
    if (btn) { btn.classList.add('pressed'); setTimeout(() => btn.classList.remove('pressed'), 120); }
  }
});

updateScreen('0');