/**
 * Created with JetBrains WebStorm.
 * User: Changyin
 * Date: 13-11-6
 * Time: ����5:01
 * To change this template use File | Settings | File Templates.
 */
KISSY.add(function(S,Node,Base,Event,Color,Ajax,Overlay){
    var $ = Node.all, Gesture = Event.Gesture;

    var gglExtension = {
        initializer: function () {
            var self = this,
                canvas = self.get("canvas"),
                color = self.get("color");

            self.set("ctx",canvas[0].getContext('2d'));
            self.set("colorHex",new Color(color).toHex());

            self.bindEvt();
            self.overlay();
            self.reset();
            self.start();
        },
        overlay: function(){
            var self = this,
                canvas = self.get("canvas"),
                overlay = new Overlay({
                    elCls:"gg-dialog",
                    mask:true,
                    align:{
                        node: canvas,
                        points: ['cc','cc'],
                        offset: [0, 0]
                    }
                });

            overlay.render();

            overlay.get("contentEl").delegate(Gesture.tap,".J_Start",function(){
                overlay.hide();
                self.reset();
            });

            overlay.get("contentEl").delegate(Gesture.tap,".J_Cancel",function(){
                overlay.hide();
                self.fire("quit");
            });



            self.set("overlay",overlay);
        },
        bindEvt: function(){
            var self = this,
                canvas = self.get("canvas"),
                ctx = self.get("ctx"),


                w = canvas.width(), h = canvas.height(),
                clientOffsetX =  canvas[0].getBoundingClientRect().left,
                clientOffsetY = canvas[0].getBoundingClientRect().top,

                oldX,
                oldY,
                curX,
                curY,

                color = self.get("color"),
                colorHex =  self.get("colorHex"),

                isOver = function() {
                    var data = ctx.getImageData(0, 0, w, h).data;

                    //ʣ�����أ�δ���ο���������#CCC ,255
                    for (var i = 0, j = 0, k = 0; i < data.length; i += 4,k++) {
                        if ((data[i] == color.r) && (data[i + 1] == color.g) && (data[i + 2] == color.b) && (data[i + 3] == color.a)) {
                            j++;
                        }
                    }

                    if ((j / (w * h)) < 0.7) {
                        self.getPuzzle();
                    }
                },

                touchMove = function (ev){
                    ev.preventDefault();

                    var clientX = ev.changedTouches?ev.changedTouches[0].clientX:ev.clientX,
                        clientY = ev.changedTouches?ev.changedTouches[0].clientY:ev.clientY;

                    curX =  clientX - clientOffsetX;
                    curY =  clientY - clientOffsetY;

                    ctx.lineTo(curX, curY);
                    ctx.stroke();

                    oldX = curX;
                    oldY = curY;

                    //forceUpdate();
                },

                touchEnd = function(ev){
                    ev.preventDefault();

                    canvas.detach(Gesture.move, touchMove);
                    canvas.detach(Gesture.end, touchEnd);

                    ctx.closePath();

                    isOver();

                };


            canvas.on(Gesture.start,function(ev){
                ev.preventDefault();

                var clientX = ev.changedTouches?ev.changedTouches[0].clientX:ev.clientX,
                    clientY = ev.changedTouches?ev.changedTouches[0].clientY:ev.clientY;

                //���ñʴ�.
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = 'destination-out';
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                //ctx.fillStyle = '';    //�����ֻ��޷�ˢ������ԭ��֮һ,�����ÿ�.
                ctx.strokeStyle = colorHex;
                ctx.lineWidth = self.get("eraserWidth");

                oldX =  clientX - clientOffsetX;
                oldY =  clientY - clientOffsetY;

                ctx.beginPath();
                ctx.moveTo(oldX,oldY);


                canvas.on(Gesture.move, touchMove);
                canvas.on(Gesture.end, touchEnd);


            })


        },
        reset: function(){
            var self = this,
                canvas = self.get("canvas"),
                ctx = self.get("ctx"),
                w = canvas.width(), h = canvas.height(),
                maskColorHex =  self.get("colorHex");
            //��ʼ���Ĳ���
            canvas[0].width = w; //ǿˢ.
            ctx.globalCompositeOperation = "source-over"; //��������ֻ�����.
            ctx.fillStyle = maskColorHex;
            ctx.fillRect(0, 0, w, h);
        },
        start: function(){
            var self = this,
                overlay = self.get("overlay"),
                el = overlay.get("contentEl");

            el.html('<div class="bd">��һ��ͼ�㣬���Թγ����</div><div class="ft"><button class="ok J_Start">��ʼ�ν�</button></div>');
            overlay.show();

        },
        getPuzzle:function(){
            var self = this,
                overlay = self.get("overlay"),
                el = overlay.get("contentEl");

            el.html('<div class="bd"><p>���ź���û�йε���� :(</p><p>'+self.failTxt()+'</p><p class="fail"></p></div><div class="ft"><button class="cancel J_Cancel">������</button><button class="ok J_Start">����һ��</button></div>');
            overlay.show();
        },
        failTxt:function(){
            var txt = [
                [
                    '�泯�󺣣���ů������',
                    '�泯�������ν����У�'
                ],
                [
                    'û�н���',
                    '������ָ�ιο���'
                ],
                [
                    'OMGû�н�����������',
                    '���ԣ���������ӡ���'
                ],
                [
                    '�����أ�����Ҫ�ľ���',
                    '���ģ������ٹ�һ�ΰɣ�'
                ],
                [
                    'ʲô��û�н���',
                    '��һ���Ǵ�Ů���İɣ�'
                ],
                [
                    '�ݳ����ý�ֺ�Σ�',
                    '�н��ĸ��ʸ�����ָ�����ԣ�'
                ],
                [
                    '�ݳ�������ͷ�Σ�',
                    '�н��ĸ��ʸ�����ָ�����ԣ�'
                ],
                [
                    '�ݳ���������Ͱ�ϣ�',
                    '������н����ʣ����ԣ�'
                ],
                [
                    '�ݳ����ñ��ӹΣ�',
                    '�н��ĸ��ʸ�����ָ�����ԣ�'
                ],
                [
                    '�ݳ�������12�㣬',
                    '�н�������ߣ����ԣ�'
                ],
                [
                    '�ݳ�����ƨ�ɹΣ�',
                    '�н��ĸ��ʸ�����ָ�����ԣ�'
                ],
                [
                    '�ݳ�����ϥ�ǹΣ�',
                    '�н��ĸ��ʸ�����ָ�����ԣ�'
                ],
                [
                    '��Ǹ��û�н���',
                    'Ҫ�������������ԣ�'
                ],
                [
                    '��Ǹ��û�н���',
                    '�����è�εðɣ�'
                ],
                [
                    '�ν�֮ǰ��',
                    '�����������㣡'
                ],
                [
                    '��ѽ��û�н���',
                    '��þ�û�������̹���·�˰ɣ�'
                ],
                [
                    '�ݳ����ν�ʱ�����·���',
                    '�н�����ߣ����ԣ�'
                ],
                [
                    '�ν�ǰ��',
                    '�����ȷ���������'
                ],
                [
                    '�ݳ���ԭ��ת3Ȧ��',
                    '�������н����ʣ����ԣ�'
                ],
                [
                    'һ������',
                    '�εĽ��಻�ԣ�'
                ],
                [
                    '�ݳ�����ƽ���ٹν���',
                    '�н����ʷ��������ԣ�'
                ],
                [
                    'һ������ν������Ʋ��ԣ�',
                    '�������ԣ�'
                ],
                [
                    'û�н���',
                    '�Ͽ�Ը�ƻ������н����ʰɣ�'
                ],
                [
                    'һ������ν�����̬�����ϣ�'
                ],
                [
                    '�´ιν�ǰ�����������'
                ],
                [
                    '����������Ҫ�ľ��ǿ��ģ�',
                    '�������������ԡ�'
                ],
                [
                    '���йز���ͳ�ƣ�',
                    '��ϥ�¹������н��ʣ����ԣ�'
                ],
                [
                    '���¿�ѧ�о������㳦��',
                    'Ҳ�ܹν������������ԣ�'
                ],
                [
                    '�޵����ɸգ�Թ�ֲ�˫����',
                    'һ��ε����سɸ߸�˧��'
                ],
                [
                    '���������⣬',
                    'ʮ�а˾�����Ϊû���У�����'
                ]
            ];
            var getRandom = function(m,n){
                return Math.ceil(Math.random()*(n-m)+m);
            }
            return txt[getRandom(0,txt.length-1)].join("");
        }



    };

    var gglAttrs =  {
        ATTRS:{
            canvas:{
                value:"",
                setter: function(v){
                    return  $(v);
                }
            },
            ctx:{
                value:{}
            },
            color:{
                value:{
                    r:204,
                    g:204,
                    b:204,
                    a:255
                }
            },
            eraserWidth:{
                value:30
            }
        }
    };

    var GGL = Base.extend(gglExtension,gglAttrs);



    return GGL;



},{
    requires:[
        'node',
        'base',
        'event',
        'color',
        'ajax',
        'overlay'
    ]
})